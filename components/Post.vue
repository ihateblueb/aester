<script>
export default {
    data: () => ({
        fillcolor: "none",
    }),
    props: {
        content: String,
    },
    created() {
        console.log("one post!")
    }
}
</script>

<template>
    <div class="post">
        <div>
            <img class="post-userAvatar" :src="content.account.avatar">
            <span>{{ content.account.display_name }}</span>
        </div>
        <span v-html="content.content"></span>
    </div>
</template>

<style>
.post {
    border-bottom: 1px solid var(--bg1);
    color: var(--txt2);
}

.post-userAvatar {
    height: 45px;

    border-radius: 7px;
}
</style>