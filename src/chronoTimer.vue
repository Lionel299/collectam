<template>
    <div class="chrono">
        <p>{{ formatTime }}</p>
        <div class="buttons"> 
            <button @click="reset">Reset</button>
            <button @click="toggleStartPause" > {{ isRunning ? 'Pause' : 'Start' }} </button>
            <button @click="addLapse" :disabled="time.value === 0">Lapse</button>
        </div>
    </div>
    <div v-if="history.length > 0" class="history" :key="index">
        <h2>Lapses :</h2>
        <ul>
            <li v-for="(item, index) in history" :key="index"> lapse {{ index + 1 }} - {{ item }} </li>
        </ul>
    </div>
</template>


<script setup>

import { computed, onBeforeUnmount, ref } from 'vue';


const time = ref(0)
const isRunning = ref(false)
const timer = ref(null)
const history = ref([])

const formatTime = computed(() => {
    const minutes = String(Math.floor(time.value / 6000)).padStart(2, '0')
    const seconds = String(Math.floor((time.value % 6000) / 100)).padStart(2, '0')
    const milliseconds = String(Math.floor(time.value % 100)).padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
})


const toggleStartPause = () => {
    if (!isRunning.value) {
        isRunning.value = true
        timer.value = setInterval(() => {
            time.value++
        }, 10)
    } else {
        isRunning.value = false
        clearInterval(timer.value)
    }
 }

 const addLapse = () =>{
    if (time.value > 0) {
        history.value.push(formatTime.value)
    }
 }


const reset = () => {
    isRunning.value = false
    clearInterval(timer.value)
    time.value = 0
    history.value = []
}

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style>
body{
    display: flex;
    justify-content: center;
    background-color: rgb(52, 51, 51);
}
.chrono {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    width: 240px;
    height: 240px;
    border: 8px solid rgb(118, 118, 153);
    border-radius: 50%;
    padding: 8px;
    margin-top: 120px;
}

.buttons{
    display: flex;
    flex-direction: row;
}

button {
    margin: 4px;
    padding: 8px;
    font-size: 16px;
    background-color: rgb(118, 118, 253);
    color: white;
    border: none;
    border-radius: 16px;
}

p {
    font-size: 48px;
    margin-bottom: 20px;
    color: rgb(251, 251, 251);
}

.history{
    color: white;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
}

.history ul{
   list-style: none;
}

.history li{
    font-size: 20px;
    padding: 4px;
}

</style>