<template>
    <div>
        <h2>{{ quiz.title }}</h2>
        <Progress :value="step" :max="quiz.questions.length - 1"/>
        <Question :key="question.question" :question="question" v-if="state === 'question'" @answer="addAnswer"/>
        <Recap v-if="state === 'recap'" :answers="answers" :quiz="quiz" />
        {{ answers }}
    </div>
</template>

<script setup>
import{ computed, ref, defineProps } from 'vue';
import Progress from './progressScreen.vue';
import Question from './questionScreen.vue';
import Recap from './recapScreen.vue';


const props = defineProps({
    quiz: Object
})

const state = ref('question')
const answers = ref(props.quiz.questions.map(() => null))
const step = ref(0)
const question = computed(() => props.quiz.questions[step.value])
const addAnswer = (answer) => {
    answers.value[step.value] = answer
    if(step.value === props.quiz.questions.length -1) {
        state.value = 'recap'
    } else {
        step.value++
    }   
}
</script>