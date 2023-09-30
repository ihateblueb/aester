<script>
export default {
    props: {
        theme: String,
    }
}
</script>

<template>
    <div class="themePreview">
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg1);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg2);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg3);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg4);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--txt1);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--txt2);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--accent1);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg-danger);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg-warning);"></div>
        <div :class="theme + ' themePreviewSwatch'" style="background-color: var(--bg-success);"></div>
    </div>
</template>

<style>
.feathericon {
    margin-bottom: -4px;
}
</style>