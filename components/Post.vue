<script setup>
import Icon from '../components/Icon.vue';
</script>

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
        <div class="boostAlertContainer" v-if="content.reblog">
            <Icon class="boostAlertIcon" name="refresh-cw" size="14px" color="var(--txt2)" />
            <span class="boostAlert">{{ content.account.display_name }} boosted</span>
        </div>
        <div class="post-userInfo">
            <div class="post-userAvatars">
                <img class="post-userAvatar" :src="content.account.avatar" v-if="!content.reblog">
                <img class="post-userAvatar" :src="content.reblog.account.avatar" v-if="content.reblog">
            </div>
            <div class="post-userNames">
                <span v-if="!content.reblog">{{ content.account.display_name }}</span>
                <span v-if="!content.reblog" class="post-userName">@{{ content.account.acct }}</span>
                <span v-if="content.reblog">{{ content.reblog.account.display_name }}</span>
                <span v-if="content.reblog" class="post-userName">@{{ content.reblog.account.acct }}</span>
            </div>
        </div>
        <span v-html="content.reblog.content" v-if="content.reblog"></span>
        <span v-html="content.content"></span>
    </div>
</template>

<style>
.boostAlertIcon {
    margin-bottom: -2px!important;
}

.boostAlertContainer {
    margin-left: 20px;
    margin-top: -10px;
    margin-bottom: 10px;
}

.boostAlert {
    color: var(--txt2);
    padding-left: 10px;
    font-size: 14px;
}

.post {
    border-bottom: 1px solid var(--bg1);
    color: var(--txt1);

    padding: 15px;
}

.post-userInfo {
    display: flex;
    margin-bottom: 15px;
}

.post-userAvatar {
    height: 45px;
    border-radius: 7px;
}

.post-userAvatars {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-right: 10px;
}

.post-userNames {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.post-userName {
    font-size: 14px;
    color: var(--txt2);
}
</style>