<script setup>
import { render } from './index.ts';
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
        let renderOutput = render(this.input)
        renderOutput.forEach(element => {
            this.output += element
        })
    },
}
</script>
/\w+/g
<template>
    <span v-html="output"></span>
</template>

<style>
.mfmMention {
    background-color: var(--accent1-25);
    padding: 1px 5px 1px 5px;
    font-size: 15px;
    border-radius: 6px;
}

.mfmHashtag {
    padding-left: 5px;
    padding-right: 5px;
}
</style>./index.js