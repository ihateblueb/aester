<script>
export default {
    props: {
        font: String,
    },
};
</script>

<template>
    <div class="fontPreview" :style="'font-family: ' + font + ', system-ui;'">
        <span>The quick brown fox jumps over the sleepy dog.</span>
    </div>
</template>

<style>
.fontPreview {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
