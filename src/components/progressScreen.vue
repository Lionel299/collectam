<template>
    <div class="progress">
        Etape {{ value + 1 }}/{{ max + 1}}
        <progress :value="value" :max="max" />
    </div>
</template>

<script setup>
import{ defineProps } from 'vue';

 defineProps({
    value: Number,
    max: Number
})
</script>

<style>
.progress{
    display: flex;
    flex-direction: column;
}
</style>