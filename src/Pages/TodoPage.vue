<template>
  <div class="container">
    <h1>✨ Vue.js To-Do List</h1>

    <!-- Section Authentification -->
    <div v-if="!token" class="auth-card">
      <h2>{{ isRegister ? 'Inscription' : 'Connexion' }}</h2>
      <input v-model="authForm.username" placeholder="Nom d'utilisateur" class="input" />
      <input v-model="authForm.password" type="password" placeholder="Mot de passe" class="input" />
      <div class="auth-actions">
        <button v-if="isRegister"
          @click="register"
          class="btn primary"
        >S'inscrire</button>
        <button
          v-else
          @click="login"
          class="btn primary"
        >Se connecter</button>
      </div>
      <p class="toggle-text">
        {{ isRegister ? 'Déjà un compte ?' : "Pas encore de compte ?" }}
        <button @click="toggleAuth" class="btn-link">
          {{ isRegister ? 'Se connecter' : "S'inscrire" }}
        </button>
      </p>
    </div>

    <!-- Section To-Do List -->
    <div v-else class="todo-card">
      <div class="header">
        <span>Bienvenue, {{ userName }}</span>
        <button @click="logout" class="btn secondary">Déconnexion</button>
      </div>
      <div class="add-task">
        <input
          v-model="newTask"
          placeholder="Nouvelle tâche"
          @keyup.enter="addTask"
          class="input"
        />
        <button @click="addTask" class="btn primary">Ajouter</button>
      </div>
    </div>
      <ul class="task-list">
        <li
          v-for="task in tasks"
          :key="task._id"
          :class="{ completed: task.completed }"
        >
          <label>
            <input type="checkbox" v-model="task.completed" @change="toggleComplete(task)" />
            <span>{{ task.title }}</span>
          </label>
          <button @click="deleteTask(task._id)" class="btn danger">Supprimer</button>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api' // adapte selon ton backend

const token = ref(localStorage.getItem('token') || '')
const isRegister = ref(true) // true = inscription, false = connexion
const authForm = ref({ username: '', password: '' })
const tasks = ref([])
const newTask = ref('')

const userName = computed(() => {
  try {
    if (!token.value) return ''
    const payload = JSON.parse(atob(token.value.split('.')[1]))
    return payload.username
  } catch {
    return ''
  }
})

watch(token, (newToken) => {
  if (newToken) {
    localStorage.setItem('token', newToken)
    fetchTasks()
  } else {
    localStorage.removeItem('token')
    tasks.value = []
  }
})

function toggleAuth() {
  isRegister.value = !isRegister.value
  authForm.value.username = ''
  authForm.value.password = ''
}

async function register() {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, authForm.value)
    token.value = res.data.token
    authForm.value.username = ''
    authForm.value.password = ''
  } catch (error) {
    const message = error.response?.data?.error || 'Erreur lors de l\'inscription'
    alert(message)
  }
}

async function login() {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, authForm.value)
    token.value = res.data.token
    authForm.value.username = ''
    authForm.value.password = ''
  } catch (error) {
    const message = error.response?.data?.error || 'Erreur d\'authentification'
    alert(message)
  }
}

function logout() {
  token.value = ''
}

async function fetchTasks() {
  try {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    tasks.value = res.data
  } catch {
    alert('Erreur lors du chargement des tâches')
    logout()
  }
}

async function addTask() {
  if (!newTask.value.trim()) return
  try {
    const res = await axios.post(
      `${API_URL}/tasks`,
      { title: newTask.value },
      { headers: { Authorization: `Bearer ${token.value}` } }
    )
    tasks.value.push(res.data)
    newTask.value = ''
  } catch {
    alert('Erreur lors de la création de la tâche')
  }
}

async function toggleComplete(task) {
  try {
    await axios.put(
      `${API_URL}/tasks/${task._id}`,
      { completed: task.completed },
      { headers: { Authorization: `Bearer ${token.value}` } }
    )
  } catch {
    alert('Erreur lors de la mise à jour')
  }
}

async function deleteTask(id) {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    tasks.value = tasks.value.filter(t => t._id !== id)
  } catch {
    alert('Erreur lors de la suppression')
  }
}

onMounted(() => {
  if (token.value) fetchTasks()
})
</script>

<style scoped>
:root {
  --primary: #4f46e5;
  --secondary: #e0e7ff;
  --danger: #f87171;
  --bg: #f8fafc;
  --card: #fff;
  --border: #e5e7eb;
  --text: #1e293b;
  --completed: #94a3b8;
}

body {
  background: var(--bg);
  font-family: 'Inter', Arial, sans-serif;
}

.container {
  max-width: 420px;
  margin: 40px auto;
  background: var(--card);
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 #0001;
  padding: 32px 24px 24px 24px;
  color: var(--text);
}

h1 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--primary);
  letter-spacing: 1px;
}

.auth-card, .todo-card {
  margin-top: 24px;
}

.input {
  width: 400px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  background: #f1f5f9;
  outline: none;
  transition: border 0.2s;
}
.input:focus {
  border-color: var(--primary);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-right: 8px;
}
.btn.primary {
  background: var(--primary);
  color: var(--primary);
}
.btn.secondary {
  background: var(--secondary);
  color: var(--primary);
}
.btn.danger {
  background: var(--danger);
  color: black;
}
.btn:active {
  opacity: 0.8;
}

.auth-actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
}

.toggle-text {
  font-size: 0.9rem;
  color: var(--text);
}

.btn-link {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 6px;
  text-decoration: underline;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 1.1rem;
}

.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
}

.task-list li {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 10px 14px;
  gap: 32px;
  transition: background 0.2s;
  border: 1px solid var(--border);
}

.task-list li.completed span {
  text-decoration: line-through;
  color: var(--completed);
}

.task-list label {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
</style>
