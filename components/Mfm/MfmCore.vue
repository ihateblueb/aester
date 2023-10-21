<script setup>
import { render } from './index.ts';
import Emoji from './Emoji.vue';
import Mention from './Mention.vue';
</script>

<script ts>
export default {
    data: () => ({
        output: ""
    }),
    props: {
        input: String
    },
    mounted() {
        let renderOutput = render(this.input.replace( /(<([^>]+)>)/ig, ''))
        renderOutput.forEach(element => {
            this.output += element
        })
    },
}
</script>

<template>
    <span v-html="output"></span>
</template>