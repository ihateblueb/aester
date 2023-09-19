<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        content: [],
        ready: false,
        showCwContent: false
    }),
    mounted() {
        this.content = this.data

        this.ready = true
    },
    methods: {

    }
}
</script>

<template>
    <div class="mColumnHeader">
        <p class="noSelection">No Selection...</p>
    </div>
    <div class="mColumnContent">

    </div>
</template>