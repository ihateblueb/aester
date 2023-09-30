<script setup>
import VueFeather from 'vue-feather';
</script>

<script>
export default {
    data: () => ({
        fillcolor: "none",
    }),
    props: {
        name: String,
        size: String,
        color: String,
        fill: Boolean,
    },
    created() {
        if (this.fill) {
            this.fillcolor = this.color
        }
    }
}
</script>

<template>
    <i v-if="name === 'pin'">
        <svg width="14" height="14" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: -1px; color: inherit;">
            <path
                d="M7 11.0491H6.55H1.6L2.8 2.96491L1 2.01055V1.00002L13 1V2.01053L11.2 2.96491L12.4 11.0491H7.45H7ZM7 11.0491V17"
                stroke="var(--txt2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </i>
    <vue-feather :type="name" :size="size" :stroke="color" :fill="fillcolor" class="feathericon" v-else></vue-feather>
</template>

<style>
.feathericon {
    margin-bottom: -4px;
}
</style>