<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
/*

export default {
    data: () => ({
        showCwContent: false
    }),
    mounted() {
        this.content = this.data

        this.ready = true
    },
    methods: {

    }
}

*/
</script>

<template>
    <div class="mColumnHeader">
        <p class="noSelection">No Selection...</p>
    </div>
    <div class="mColumnContent">
        <NuxtLink to="/trending">Trending</NuxtLink>
        <NuxtLink to="/local">Local Timeline</NuxtLink>
        <NuxtLink to="/federated">Federated Timeline</NuxtLink>
    </div>
</template>

<style>

</style>