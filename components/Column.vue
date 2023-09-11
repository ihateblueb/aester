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
    props: {
        view: String,
    },
    mounted() {
        this.content = this.data

        this.ready = true
    },
    methods: {

    }
}
</script>

<template>
    <div v-if="this.view.startsWith('@')">
        <div class="mColumnHeader">
            <p class="noSelection">@</p>
        </div>
        <div class="mColumnContent">

        </div>
    </div>
    <div v-if="!this.view.startsWith('@')">
        <div class="mColumnHeader">
            <p class="noSelection">No Selection...</p>
        </div>
        <div class="mColumnContent">

        </div>
    </div>
</template>