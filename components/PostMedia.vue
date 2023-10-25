<script>
export default {
    data: () => ({
        content: {},
        ready: false
    }),
    props: {
        data: Object,
    },
    mounted() {
        this.content = this.data;

        this.ready = true;
    },
};
</script>

<template>
    <div v-if="ready">
        <div v-for="media in content" v-if="content.length > 0">
            <a :href="media.url">{{ media.type }}</a>
        </div>
    </div>
</template>

<style>
.media {
    color: var(--txt2);
}
</style>