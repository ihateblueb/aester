<script setup lang="ts">
useSeoMeta({
    title: 'Aster',
    ogTitle: 'Aster',
    charset: 'UTF-8',
    description: 'A web Mastodon client',
    ogDescription: 'A web Mastodon client',
    twitterCard: 'summary',
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
@import url('/assets/main.css');
</style>
