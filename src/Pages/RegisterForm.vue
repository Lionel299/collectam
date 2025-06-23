<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2>Inscription</h2>
    <div class="form-group">
      <label for="nom">Nom :</label>
      <input type="text" id="nom" v-model="nom" required placeholder="Entrez votre nom" />
    </div>
    <div class="form-group">
      <label for="prenom">Prénom :</label>
      <input type="text" id="prenom" v-model="prenom" required placeholder="Entrez votre prénom" />
    </div>
    <div class="form-group">
      <label for="email">E-mail :</label>
      <input type="email" id="email" v-model="email" required placeholder="Entrez votre e-mail" />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required placeholder="Entrez votre mot de passe" />
    </div>
    <button type="submit" class="btn-submit">S'inscrire</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const nom = ref('')
const prenom = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  const formData = {
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    password: password.value,
  }

  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    if (response.ok) {
      alert('Inscription réussie !')
      nom.value = ''
      prenom.value = ''
      email.value = ''
      password.value = ''
    } else {
      alert('Erreur : ' + data.message)
    }
  } catch (error) {
    alert('Erreur réseau ou serveur')
    console.error(error)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #34495e;
}

input {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px #4caf50aa;
}

input::placeholder {
  color: #aaa;
  font-style: italic;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>

