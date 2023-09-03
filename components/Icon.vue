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
        if(this.fill) {
            this.fillcolor = this.color
        }
    }
}
</script>

<template>
    <vue-feather :type="name" :size="size" :stroke="color" :fill="fillcolor" class="feathericon"></vue-feather>
</template>

<style>
.feathericon {
    margin-bottom: -4px;
}
</style>