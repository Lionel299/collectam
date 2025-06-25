<template>
  <div>
    <button class="localise-btn" @click="localiseMoi" :disabled="isLoading">
      {{ isLoading ? 'Localisation en cours...' : 'Localise moi' }}
    </button>
    <div ref="mapContainer" style="height: 500px; margin-top:10px;"></div>
    <div v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const apiUrl = process.env.VUE_APP_API_URL

const mapContainer = ref(null)
let map = null
let myMarker = null
const allMarkers = []
const errorMessage = ref('')
const isLoading = ref(false)
const route = useRoute()
const userType = ref(route.query.userType || 'citizen')

let deviceId = localStorage.getItem('deviceId')
if (!deviceId) {
  deviceId = Math.random().toString(36).substring(2)
  localStorage.setItem('deviceId', deviceId)
}

// Icônes locales dans public/icons/
const icons = {
  citizen: 'leaflet/images/userIcon.svg',
  collector: 'leaflet/images/collectorIcon.svg',
  admin: '/icons/admin.png'
}

async function loadAllMarkers() {
  try {
    const res = await fetch(`${apiUrl}/api/location/all`)
    if (!res.ok) throw new Error('Erreur lors du chargement des positions')
    const locations = await res.json()

    locations.forEach(loc => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = `url(${icons[loc.userType] || icons.citizen})`
      el.style.width = '30px'
      el.style.height = '40px'
      el.style.backgroundSize = 'contain'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.cursor = 'pointer'

      const marker = new maplibregl.Marker(el)
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(`Device: ${loc.deviceId}\nType: ${loc.userType}`))
        .addTo(map)
      allMarkers.push(marker)
    })
  } catch (err) {
    errorMessage.value = "Impossible de charger les positions existantes."
    console.error(err)
  }
}

function localiseMoi() {
  if (!('geolocation' in navigator)) {
    errorMessage.value = "La géolocalisation n'est pas supportée par ce navigateur."
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  navigator.geolocation.getCurrentPosition(
    async position => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      try {
        const res = await fetch(`${apiUrl}/api/location/saveLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: lat, longitude: lng, deviceId, userType: userType.value })
        })
        if (!res.ok) throw new Error('Erreur serveur lors de l’enregistrement')
      } catch (err) {
        console.error('Erreur en envoyant la position au backend', err)
        errorMessage.value = "Impossible d'envoyer la position au serveur."
        isLoading.value = false
        return
      }

      if (myMarker) {
        myMarker.setLngLat([lng, lat])
        const el = myMarker.getElement()
        el.style.backgroundImage = `url(${icons[userType.value]})`
      } else {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundImage = `url(${icons[userType.value]})`
        el.style.width = '30px'
        el.style.height = '40px'
        el.style.backgroundSize = 'contain'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.cursor = 'pointer'

        myMarker = new maplibregl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Vous êtes ici'))
          .addTo(map)
      }

      map.flyTo({ center: [lng, lat], zoom: 16 })
      isLoading.value = false
    },
    error => {
      errorMessage.value = "Erreur de géolocalisation : " + error.message
      isLoading.value = false
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://api.maptiler.com/maps/0197a6fb-a81a-7f50-8d0f-aae437805f0e/style.json?key=DvJJUZaEy1icy86CXLTL',
    center: [0, 0],
    zoom: 2
  })

  map.on('style.load', () => {
    map.setProjection({ type: 'globe' })
    loadAllMarkers()
  })
})

onBeforeUnmount(() => {
  allMarkers.forEach(m => m.remove())
  if (myMarker) myMarker.remove()
  if (map) map.remove()
})
</script>

<style scoped>
.localise-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.12);
  transition: background 0.2s, transform 0.2s;
  margin-bottom: 10px;
}
.localise-btn:hover:enabled {
  background-color: #1565c0;
  transform: translateY(-2px) scale(1.03);
}
.localise-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.marker {
  width: 30px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>

