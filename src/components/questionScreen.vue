<template>
    <div class="question">
        <h4>{{ question.question }}</h4>
        <ul>
            <li v-for="choice in question.choices" :key="choice">
                <label for="`answer${index}`">
                    <input type="radio" name="answer" id="`answer${index}`" v-model="answer" :value="choice">
                    {{ choice }}
                </label>
            </li>
        </ul>
        <button :disabled="!hasAnswer" @click="emits ('answer', answer)">Question Suivante</button>
        
    </div>
</template>

<script setup>
import{ ref, defineProps,defineEmits, computed } from 'vue';

 defineProps({question: Object })
 const answer = ref(null)
 const emits = defineEmits(['answer'])
 const hasAnswer = computed(() => answer.value !== null)

</script>

<style>
button{
    background-color: rgb(82, 82, 239);
    color: white;
    border: none;
    border-radius: 4px;
    width: 160px;
    height: 24px;
    display: block;
    margin: 8px;
}
button:hover{
    background-color: rgb(5, 5, 251);
    cursor: pointer;
}
</style>