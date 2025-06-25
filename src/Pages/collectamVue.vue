<template>
  <div class="container">
    <h1>Gestion des utilisateurs</h1>

    <!-- Bouton bascule inscription/connexion -->
    <button @click="toggleLoginMode" class="back-btn" style="margin-bottom: 20px;">
      {{ isLoginMode ? "Créer un compte" : "J'ai déjà un compte" }}
    </button>

    <!-- FORMULAIRE CONNEXION -->
    <section v-if="isLoginMode" class="registration-form">
      <h2>Connexion</h2>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="loginEmail">Adresse e-mail</label>
          <input id="loginEmail" v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label for="loginPassword">Mot de passe</label>
          <input id="loginPassword" v-model="form.password" type="password" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </section>

      <!-- Choix du rôle -->
      <section v-if="!roleSelected" class="role-selection">
        <h2>Choisissez votre rôle</h2>
        <div class="roles">
          <button @click="selectRole('citizen')">Citoyen</button>
          <button @click="selectRole('collector')">Collecteur</button>
          <button @click="selectRole('admin')">Admin</button>
        </div>
      </section>

      <!-- Formulaire citoyen/admin -->
      <section v-else-if="(role !== 'collector' || showUserForm) && !registrationDone" class="registration-form">
        <h2>Inscription en tant que <span class="role">{{ role }}</span></h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input id="firstName" v-model="form.firstName" type="text" required />
          </div>
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input id="lastName" v-model="form.lastName" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Adresse e-mail</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="address">Adresse</label>
            <input id="address" v-model="form.address" type="text" required />
          </div>
          <div class="form-group">
            <label for="neighborhood">Quartier</label>
            <input id="neighborhood" v-model="form.neighborhood" type="text" required />
          </div>
          <div class="form-group">
            <label for="phone">Numéro de téléphone</label>
            <input id="phone" v-model="form.phone" type="tel" required pattern="^\+?\d{7,15}$" />
            <small>Format attendu : chiffres, avec option + au début</small>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input id="password" v-model="form.password" type="password" minlength="6" required />
          </div>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Enregistrement...' : "S'inscrire" }}
          </button>
        </form>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button @click="resetForm" class="back-btn">Changer de rôle</button>
      </section>

      <!-- Collecteur : questionnaire véhicule -->
      <section v-else-if="role === 'collector' && !showUserForm && !registrationDone" class="registration-form">
        <h2>Inscription Collecteur - Étape {{ collectorStep }}</h2>
        <div v-if="collectorStep === 1" class="form-group">
          <label>Avez-vous un véhicule ?</label>
          <div>
            <label><input type="radio" value="oui" v-model="collectorData.hasVehicle" /> Oui</label>
            <label style="margin-left: 20px;"><input type="radio" value="non" v-model="collectorData.hasVehicle" />
              Non</label>
          </div>
          <button type="button" :disabled="!collectorData.hasVehicle" @click="nextCollectorStep">Suivant</button>
        </div>
        <form v-if="collectorStep === 2 && collectorData.hasVehicle === 'oui'"
          @submit.prevent="finishCollectorQuestions">
          <div class="form-group">
            <label for="brand">Marque</label>
            <input id="brand" v-model="collectorData.vehicle.brand" type="text" required />
          </div>
          <div class="form-group">
            <label for="registration">Immatriculation</label>
            <input id="registration" v-model="collectorData.vehicle.registration" type="text" required />
          </div>
          <div class="form-group">
            <label for="maxWeight">Poids maximum (kg)</label>
            <input id="maxWeight" v-model.number="collectorData.vehicle.maxWeight" type="number" min="0" required />
          </div>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Chargement...' : 'Terminé' }}
          </button>
        </form>
        <div v-if="collectorStep === 2 && collectorData.hasVehicle === 'non'">
          <button @click="finishCollectorQuestions" :disabled="loading">
            {{ loading ? 'Chargement...' : 'Terminé' }}
          </button>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button @click="resetForm" class="back-btn">Changer de rôle</button>
      </section>

      <!-- Page de bienvenue -->
      <section v-else-if="registrationDone" class="welcome-page">
        <h2>Bienvenue sur notre application</h2>
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
          <button @click="resetForm" class="back-btn">Retour à l'inscription</button>
          <button @click="goToMap" class="back-btn">Aller à la map</button>
        </div>
      </section>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const role = ref('')
const roleSelected = ref(false)
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const registrationDone = ref(false)

const isLoginMode = ref(false)

const collectorStep = ref(1)
const collectorData = reactive({
  hasVehicle: '',
  vehicle: {
    brand: '',
    registration: '',
    maxWeight: null,
  },
})

const showUserForm = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  neighborhood: '',
  phone: '',
  password: '',
})

const isLoading = ref(false)
const apiUrl = process.env.VUE_APP_API_URL

let deviceId = localStorage.getItem('deviceId')
if (!deviceId) {
  deviceId = Math.random().toString(36).substring(2)
  localStorage.setItem('deviceId', deviceId)
}

function toggleLoginMode() {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
  successMessage.value = ''
  Object.keys(form).forEach(key => form[key] = '')
  role.value = ''
  roleSelected.value = false
  registrationDone.value = false
  collectorStep.value = 1
  collectorData.hasVehicle = ''
  collectorData.vehicle.brand = ''
  collectorData.vehicle.registration = ''
  collectorData.vehicle.maxWeight = null
  showUserForm.value = false
}

function selectRole(selectedRole) {
  role.value = selectedRole
  roleSelected.value = true
  successMessage.value = ''
  errorMessage.value = ''
  registrationDone.value = false
  collectorStep.value = 1
  collectorData.hasVehicle = ''
  collectorData.vehicle.brand = ''
  collectorData.vehicle.registration = ''
  collectorData.vehicle.maxWeight = null
  showUserForm.value = false
  Object.keys(form).forEach(key => form[key] = '')
}

function resetForm() {
  role.value = ''
  roleSelected.value = false
  successMessage.value = ''
  errorMessage.value = ''
  registrationDone.value = false
  collectorStep.value = 1
  collectorData.hasVehicle = ''
  collectorData.vehicle.brand = ''
  collectorData.vehicle.registration = ''
  collectorData.vehicle.maxWeight = null
  showUserForm.value = false
  Object.keys(form).forEach(key => form[key] = '')
  isLoginMode.value = false
}

function nextCollectorStep() {
  if (collectorStep.value === 1 && collectorData.hasVehicle) {
    collectorStep.value = 2
  }
}

function finishCollectorQuestions() {
  if (collectorData.hasVehicle === 'oui') {
    if (!collectorData.vehicle.brand.trim() || !collectorData.vehicle.registration.trim() || collectorData.vehicle.maxWeight === null) {
      errorMessage.value = 'Veuillez remplir correctement les informations sur le véhicule.'
      return
    }
  }
  errorMessage.value = ''
  showUserForm.value = true
}

async function submitForm() {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.address.trim() || !form.neighborhood.trim() || !form.phone.trim() || !form.password) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.'
    loading.value = false
    return
  }

  const payload = {
    role: role.value,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    address: form.address.trim(),
    neighborhood: form.neighborhood.trim(),
    phone: form.phone.trim(),
    password: form.password,
    hasVehicle: role.value === 'collector' ? collectorData.hasVehicle === 'oui' : undefined,
    vehicle: role.value === 'collector' && collectorData.hasVehicle === 'oui'
      ? {
        brand: collectorData.vehicle.brand.trim(),
        registration: collectorData.vehicle.registration.trim(),
        maxWeight: collectorData.vehicle.maxWeight,
      }
      : undefined,
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.error || 'Erreur lors de l\'inscription')
    }
    successMessage.value = 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
    errorMessage.value = ''
    registrationDone.value = true
  } catch (err) {
    errorMessage.value = err.message
    successMessage.value = ''
  } finally {
    loading.value = false
  }
}

async function submitLogin() {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.email.trim() || !form.password) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.'
    loading.value = false
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email.trim(),
        password: form.password
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erreur lors de la connexion')
    successMessage.value = 'Connexion réussie !'
    errorMessage.value = ''
    // Ici tu peux stocker le token ou rediriger l'utilisateur
  } catch (err) {
    errorMessage.value = err.message
    successMessage.value = ''
  } finally {
    loading.value = false
  }
}

function goToMap() {
  if (!role.value) {
    errorMessage.value = "Veuillez sélectionner un rôle avant d'aller à la map."
    return
  }
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
        // Envoi au backend
        const res = await fetch(`${apiUrl}/api/location/saveLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: lat,
            longitude: lng,
            deviceId,      // récupéré comme dans ton code
            userType: role.value
          })
        })
        if (!res.ok) throw new Error('Erreur serveur lors de l’enregistrement')
      } catch (err) {
        errorMessage.value = "Impossible d'envoyer la position au serveur."
        isLoading.value = false
        return
      }

      isLoading.value = false
      // Redirection vers la map avec le rôle en query param
      router.push({ name: 'Map', query: { userType: role.value } })
    },
    error => {
      errorMessage.value = "Erreur de géolocalisation : " + error.message
      isLoading.value = false
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 40px auto;
  background: #f9fafb;
  padding: 25px 30px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #16a085;
}

h2 {
  margin-bottom: 20px;
  color: #34495e;
  text-align: center;
}

.role-selection .roles {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.role-selection button {
  background-color: #16a085;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 30%;
}

.role-selection button:hover {
  background-color: #13856e;
}

.registration-form form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
}

input {
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #16a085;
  box-shadow: 0 0 5px #16a085aa;
}

button[type="submit"],
button[type="button"] {
  margin-top: 10px;
  background-color: #16a085;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  transition: background-color 0.3s ease;
  width: fit-content;
  align-self: center;
}

button[type="submit"]:disabled,
button[type="button"]:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

button[type="submit"]:hover:not(:disabled),
button[type="button"]:hover:not(:disabled) {
  background-color: #13856e;
}

.success {
  color: #27ae60;
  margin-top: 12px;
  font-weight: 600;
  text-align: center;
}

.error {
  color: #c0392b;
  margin-top: 12px;
  font-weight: 600;
  text-align: center;
}

.back-btn {
  margin-top: 20px;
  background: none;
  border: none;
  color: #16a085;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  text-align: center;
  width: 100%;
}

.back-btn:hover {
  color: #13856e;
}

.welcome-page {
  text-align: center;
  margin-top: 50px;
  font-size: 1.5rem;
  color: #16a085;
}
</style>
