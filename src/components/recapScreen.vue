<template>
    <h1>Recap</h1>
    <p>
        {{ hasWon ? quiz.success_message : quiz.failure_message }}
    </p>
    <p>
        score : {{ score }}/{{ quiz.questions.length }}
    </p>

</template>

<script setup>
import { computed,defineProps } from 'vue';

const props = defineProps({
    quiz: Object,
    answers: Array
})

const score = computed(() => {
    return props.quiz.questions.reduce((acc, question, k) => {
        if (question.correct_answer === props.answers[k]) {
            return acc+1
        }

        return acc
    }, 0)
})

const hasWon = computed(() => score.value >= props.quiz.minimum_score)
</script>
