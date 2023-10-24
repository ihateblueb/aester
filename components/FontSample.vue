<script>
export default {
    props: {
        font: String,
    },
};
</script>

<template>
    <div class="fontPreview">
        <span :class="'ft_'+font+' fontPreviewText'">The quick brown fox jumps over the lazy dog.</span>
    </div>
</template>

<style>
.fontPreview {
    margin-top: 5px;
    margin-bottom: 5px;
}
.fontPreviewText {
    font-family: var(--font1);
    color: var(--txt2);
}
</style>
