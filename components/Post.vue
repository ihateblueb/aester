<script setup>
import PostMedia from './PostMedia.vue';
import PostInteractions from './PostInteractions.vue';

import {
    VTooltip,
    VClosePopper,
    Dropdown,
    Tooltip,
    Menu
} from 'floating-vue'
import 'floating-vue/dist/style.css'
</script >

<script>
export default {
    data: () => ({
        content: {},
        ready: false,
        showCwContent: false,
        showcwtext: "Show More",
        timer: 0,
    }),
    props: {
        pinned: Boolean,
        expanded: Boolean,
        data: Object,
    },
    mounted() {
        this.instanceurl = this.getLocalStorage("instanceurl")
        this.token = this.getLocalStorage("token")
        this.content = this.data;

        this.timer = setInterval(() => {
            this.timer += 1;
        }, 5000);

        this.ready = true;
    },
    methods: {
        setLocalStorage(key, value) {
            if (process.client) {
                localStorage.setItem(key, value);
            }
        },
        getLocalStorage(key) {
            if (process.client) {
                return localStorage.getItem(key);
            }
        },
        removeLocalStorage(key) {
            if (process.client) {
                return localStorage.removeItem(key);
            }
        },

        timeAgo(time) {
            switch (typeof time) {
                case "number":
                    break;
                case "string":
                    time = +new Date(time);
                    break;
                case "object":
                    if (time.constructor === Date) time = time.getTime();
                    break;
                default:
                    time = +new Date();
            }
            var time_formats = [
                [60, "s", 1],
                [120, "1m", "1m"],
                [3600, "m", 60],
                [7200, "1h", "1h"],
                [86400, "h", 3600],
                [604800, "d", 86400],
                [2419200, "w", 604800],
                [29030400, "mo", 2419200],
                [2903040000, "y", 29030400],
                [58060800000, "c", 2903040000],
            ];
            var seconds = (+new Date() - time) / 1000,
                list_choice = 1;
            if (seconds === 0) {
                return "now";
            }
            var i = 0,
                format;
            while ((format = time_formats[i++]))
                if (seconds < format[0]) {
                    if (typeof format[2] == "string")
                        return format[list_choice];
                    else return Math.floor(seconds / format[2]) + format[1];
                }
            return time;
        },
        toggleShowCW() {
            if (this.showCwContent) {
                this.showCwContent = false
                this.showcwtext = "Show More"
            } else {
                this.showCwContent = true
                this.showcwtext = "Show Less"
            }
        }
    }
};
</script>

<template>
    <div class="post" v-if="ready">
        <div class="boostAlertContainer" v-if="content.reblog">
            <div>
                <Icon class="boostAlertIcon" name="repeat" size="14px" color="var(--txt2)" />
            </div>
            <div>
                <span class="boostAlert">{{ content.account.display_name }} boosted</span>
            </div>
        </div>
        <div class="boostAlertContainer" v-if="pinned">
            <div>
                <Icon class="boostAlertIcon" name="pin" size="14px" color="var(--txt2)" />
            </div>
            <div>
                <span class="boostAlert">Pinned toot</span>
            </div>
        </div>

        <div class="post-userInfo">
            <div class="post-userAvatars">
                <img class="post-userAvatar" :src="content.account.avatar" loading="lazy" v-if="!content.reblog" />
                <img class="post-userAvatar" :src="content.reblog.account.avatar" loading="lazy" v-if="content.reblog" />
            </div>
            <div class="post-userNames">
                <NuxtLink :to="'/@'+content.reblog.account.acct" v-if="content.reblog">
                    <p class="post-displayName">{{ content.reblog.account.display_name }}</p>
                    <p class="post-userName">@{{ content.reblog.account.acct }}</p>
                </NuxtLink>
                <NuxtLink :to="'/@'+content.account.acct" v-if="!content.reblog">
                    <p class="post-displayName">{{ content.account.display_name }}</p>
                    <p class="post-userName">@{{ content.account.acct }}</p>
                </NuxtLink>
            </div>
            <div class="post-infoIcons" v-if="!content.reblog">
                <div class="post-infoIcon post-infoIcons-visibility">
                    <Icon name="globe" size="14px" color="var(--txt2)" v-if="content.visibility === 'public'"
                        v-tooltip="'Public'" />
                    <Icon name="unlock" size="14px" color="var(--txt2)" v-if="content.visibility === 'unlisted'"
                        v-tooltip="'Unlisted'" />
                    <Icon name="users" size="14px" color="var(--txt2)" v-if="content.visibility === 'private'"
                        v-tooltip="'Followers Only'" />
                    <Icon name="at-sign" size="14px" color="var(--txt2)" v-if="content.visibility === 'direct'"
                        v-tooltip="'Mentioned Only'" />
                </div>
                <div class="post-infoIcon post-infoIcons-created"
                    v-tooltip="new Date(content.created_at).toLocaleDateString()" :key="timer">
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="post-infoIcons" v-if="content.reblog">
                <div class="post-infoIcon post-infoIcons-visibility">
                    <Icon name="globe" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'public'"
                        v-tooltip="'Public'" />
                    <Icon name="unlock" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'unlisted'"
                        v-tooltip="'Unlisted'" />
                    <Icon name="users" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'private'"
                        v-tooltip="'Followers Only'" />
                    <Icon name="at-sign" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'direct'"
                        v-tooltip="'Mentioned Only'" />
                </div>
                <div class="post-infoIcon post-infoIcons-created"
                    v-tooltip="new Date(content.reblog.created_at).toLocaleDateString()" :key="timer">
                    {{ timeAgo(content.reblog.created_at) }}
                </div>
            </div>
        </div>
        <div class="post-content">
            <div v-if="!content.reblog">

                <div v-if="!content.spoiler_text">
                    <div>
                        <p v-html="content.content" />
                    </div>

                    <PostMedia :data="content.media_attachments" v-if="content.media_attachments" />
                </div>
                <div v-if="content.spoiler_text">
                    <div class="cwAlert">
                        <Icon type="alert-triangle" size="18px" color="var(--bg-warning)" />
                        <p class="cwText">{{ content.spoiler_text }}</p>
                        <button class="cwButton" @click="toggleShowCW()">
                            {{ showcwtext }}
                        </button>
                    </div>
                    <div class="cwContent" v-if="showCwContent">
                        <div>
                            <p v-html="content.content" />
                        </div>

                        <PostMedia :data="content.media_attachments" v-if="content.media_attachments" />
                    </div>
                </div>

                <PostInteractions :data="content" />
            </div>
            <div v-if="content.reblog">

                <div v-if="!content.reblog.spoiler_text">
                    <div>
                        <p v-html="content.reblog.content" />
                    </div>

                    <PostMedia :data="content.reblog.media_attachments" v-if="content.reblog.media_attachments" />
                </div>
                <div v-if="content.reblog.spoiler_text">
                    <div class="cwAlert">
                        <Icon type="alert-triangle" size="18px" color="var(--bg-warning)" />
                        <p class="cwText">{{ content.reblog.spoiler_text }}</p>
                        <button class="cwButton" @click="toggleShowCW()">
                            {{ showcwtext }}
                        </button>
                    </div>
                    <div class="cwContent" v-if="showCwContent">
                        <div>
                            <p v-html="content.reblog.content" />
                        </div>

                        <PostMedia :data="content.reblog.media_attachments" v-if="content.reblog.media_attachments" />
                    </div>
                </div>

                <PostInteractions :data="content.reblog" />
            </div>
        </div>
    </div>
</template>

<style>
.post-infoIcons-created {
    cursor: default;
}

.cwAlert p {
    margin-bottom: 0px !important;
}

.postInteractionBar {
    padding-top: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.postInteraction {
    background-color: transparent;
    border: none;
    cursor: pointer;

    color: var(--txt2);
}

.postInteraction.pIbookmarked span,
.postInteraction.pIbookmarked {
    color: var(--bookmark) !important;
}

.postInteraction.pIreblogged span {
    color: var(--reblog) !important;
}

.postInteraction.pIfavorited span,
.postInteraction.pIbookmarked {
    color: var(--favorite) !important;
}

.postInteraction span {
    padding-left: 7px;
}

.boostAlertIcon {
    margin-bottom: -2px !important;
}

.boostAlertContainer {
    margin-left: 20px;
    margin-top: -10px;
    margin-bottom: 10px;

    display: flex;

    & div {
        min-width: 20px;
    }
}

.boostAlert {
    color: var(--txt2);
    padding-left: 5px;
    font-size: 14px;
}

.postReactionBar {
    padding-top: 15px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.postReaction.pRme {
    border-color: var(--accent1) !important;
    background-color: var(--accent1-50);
}

.postReaction {
    padding: 3px;
    padding-left: 6px !important;
    padding-right: 6px !important;

    border: 1px solid var(--bg4);
    border-radius: 7px;
    background-color: var(--bg2);

    font-size: 14px;

    user-select: none;
    cursor: pointer;

    margin-right: 5px;
    margin-bottom: 5px;
}

.postReactionCounter {
    padding-left: 5px;
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
    width: 45px;
    border-radius: 7px;
}

.post-userAvatars {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-right: 10px;
}

.post-content {
    text-wrap: wrap;
    overflow-wrap: break-word;
}

.post-mediaContainer {
    max-height: 300px;
    min-height: 175px;
    display: flex;
    background-color: #000000;
    justify-content: space-around;
    align-content: center;
}

.post-media {
    width: 100%;
    box-sizing: border-box;
}

.post-mediaContainer img {
    aspect-ratio: 16 / 9;
}

video {
    aspect-ratio: 16 / 9;
    width: 100%;
}

.post-mediaContainerMargin {
    margin-top: 15px;
}

.post-media,
.post-media a {
    display: flex;
    align-items: center;
    justify-content: center;
}

.post-media img {
    object-fit: contain;
    max-height: 200px;
    width: 100%;
}

.post-attachments.multiple.visible {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.post-attachments.three.visible {
    grid-template-columns: repeat(3, 1fr) !important;
}

.post-attachments.four.visible img {
    max-height: 100px;
}

.post-attachments.four.visible video {
    max-height: 100px !important;
}

.post-attachments .post-mediaContainer {
    background-color: #000000;
    border: 1px solid var(--bg2);
}

.post-attachments {
    display: none;
}

.post-attachments.visible {
    margin-top: 15px;
    display: block;
}
</style>
