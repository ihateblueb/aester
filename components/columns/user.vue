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
    <div>
        hey
    </div>
</template>

<style>

</style>