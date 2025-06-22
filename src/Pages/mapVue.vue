<template>
  <div>
    <button class="localise-btn" @click="localiseMoi">Localise moi</button>
    <div ref="mapContainer" style="height: 500px; margin-top:10px;"></div>
    <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

// Récupérer l'URL du backend depuis la variable d'environnement Vue.js
const apiUrl = process.env.VUE_APP_API_URL

const mapContainer = ref(null)
const map = ref(null)
const myMarker = ref(null)
const errorMessage = ref('')

// Icône par défaut Leaflet
const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Génère ou récupère un deviceId unique pour l'utilisateur
let deviceId = localStorage.getItem('deviceId')
if (!deviceId) {
  deviceId = Math.random().toString(36).substring(2)
  localStorage.setItem('deviceId', deviceId)
}

function localiseMoi() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        // 1. Envoie la position au backend en utilisant apiUrl
        try {
          await fetch(`${apiUrl}/api/location/saveLocation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude: lat, longitude: lng, deviceId })
          })
        } catch (err) {
          console.error('Erreur en envoyant la position au backend', err)
        }

        // 2. Place ou déplace le marqueur sur la carte
        if (myMarker.value) {
          myMarker.value.setLatLng([lat, lng])
        } else {
          myMarker.value = L.marker([lat, lng], { icon: defaultIcon })
            .addTo(map.value)
            .bindPopup('Vous êtes ici')
            .openPopup()
        }
        map.value.setView([lat, lng], 16)
        errorMessage.value = ''
      },
      error => {
        errorMessage.value = "Erreur de géolocalisation : " + error.message
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  } else {
    errorMessage.value = "La géolocalisation n'est pas supportée par ce navigateur."
  }
}

onMounted(async () => {
  await nextTick()
  map.value = L.map(mapContainer.value).setView([0, 0], 2)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)
})
</script>


<style>
.localise-btn {
  background-color: #1976d2;
  color: #fff;
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
.localise-btn:hover {
  background-color: #1565c0;
  transform: translateY(-2px) scale(1.03);
}
</style>
