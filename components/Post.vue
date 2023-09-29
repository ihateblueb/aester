<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        content: [],
        ready: false,
        showCwContent: false,
        showcwtext: "Show More",
        timer: 0,
    }),
    props: {
        instanceurl: String,
        token: String,
        pinned: Boolean,
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.ready = true
        this.timer = setInterval(() => {
            this.timer += 1; 
        }, 5000)
    },
    methods: {
        timeAgo(time) {
            switch (typeof time) {
                case 'number':
                    break;
                case 'string':
                    time = +new Date(time);
                    break;
                case 'object':
                    if (time.constructor === Date) time = time.getTime();
                    break;
                default:
                    time = +new Date();
            }
            var time_formats = [
                [60, 's', 1],
                [120, '1m', '1m'],
                [3600, 'm', 60],
                [7200, '1h', '1h'],
                [86400, 'h', 3600],
                [604800, 'd', 86400],
                [2419200, 'w', 604800],
                [29030400, 'mo', 2419200],
                [2903040000, 'y', 29030400],
                [58060800000, 'c', 2903040000]
            ];
            var seconds = (+new Date() - time) / 1000,
                list_choice = 1;
            if (seconds == 0) {
                return 'now'
            }
            var i = 0,
                format;
            while (format = time_formats[i++])
                if (seconds < format[0]) {
                    if (typeof format[2] == 'string')
                        return format[list_choice];
                    else
                        return Math.floor(seconds / format[2]) + format[1];
                }
            return time;
        },
        async postInteraction(type, id) {
            if (type === 'boost') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/reblog", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            } else if (type === 'unboost') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unreblog", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            } else if (type === 'favorite') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/favourite", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            } else if (type === 'unfavorite') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unfavourite", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            } else if (type === 'bookmark') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/bookmark", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            } else if (type === 'unbookmark') {
                let response = await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unbookmark", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })

                if (response.status === 200) {
                    this.content = await response.json()
                } else {
                    console.log(await type + " failed. " + response.status + " " + response.statusText)
                }
            }
        },
        async toggleShowCW() {
            if (this.showCwContent === true) {
                this.showCwContent = false;
                this.showcwtext = "Show More"
            } else {
                this.showCwContent = true;
                this.showcwtext = "Show Less"
            }
        }
    }
}
</script>

<template>
    <div class="post" v-if="ready">
        <div class="boostAlertContainer" v-if="content.reblog">
            <Icon class="boostAlertIcon" name="repeat" size="14px" color="var(--txt2)" />
            <span class="boostAlert">{{ content.account.display_name }} boosted</span>
        </div>
        <div class="boostAlertContainer" v-if="pinned"> 
            <Icon class="boostAlertIcon" name="corner-left-down" size="14px" color="var(--txt2)" />
            <span class="boostAlert">Pinned toot</span>
        </div>
        <div class="post-userInfo">
            <div class="post-userAvatars">
                <img class="post-userAvatar" :src="content.account.avatar" loading="lazy" v-if="!content.reblog">
                <img class="post-userAvatar" :src="content.reblog.account.avatar" loading="lazy" v-if="content.reblog">
            </div>
            <div class="post-userNames">
                <NuxtLink :to="'/@' + content.account.acct" v-if="!content.reblog" class="post-displayName">{{
                    content.account.display_name }}</NuxtLink>
                <NuxtLink :to="'/@' + content.account.acct" v-if="!content.reblog" class="post-userName">@{{
                    content.account.acct
                }}</NuxtLink>
                <NuxtLink :to="'/@' + content.reblog.account.acct" v-if="content.reblog" class="post-displayName">{{
                    content.reblog.account.display_name }}</NuxtLink>
                <NuxtLink :to="'/@' + content.reblog.account.acct" v-if="content.reblog" class="post-userName">@{{
                    content.reblog.account.acct }}</NuxtLink>
            </div>
            <div class="post-infoIcons" v-if="content.reblog">
                <div class="post-infoIcon post-infoIcons-visibility">
                    <Icon name="globe" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'public'"
                        :title="this.content.reblog.visibility" />
                    <Icon name="unlock" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'unlisted'"
                        :title="this.content.reblog.visibility" />
                    <Icon name="users" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'private'"
                        :title="this.content.reblog.visibility" />
                    <Icon name="at-sign" size="14px" color="var(--txt2)" v-if="content.reblog.visibility === 'direct'"
                        :title="this.content.reblog.visibility" />
                </div>
                <div class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.reblog.created_at).toLocaleDateString()" :key="timer">
                    {{ timeAgo(content.reblog.created_at) }}
                </div>
            </div>
            <div class="post-infoIcons" v-if="!content.reblog">
                <div class="post-infoIcon post-infoIcons-visibility">
                    <Icon name="globe" size="14px" color="var(--txt2)" v-if="content.visibility === 'public'"
                        :title="this.content.visibility" />
                    <Icon name="unlock" size="14px" color="var(--txt2)" v-if="content.visibility === 'unlisted'"
                        :title="this.content.visibility" />
                    <Icon name="users" size="14px" color="var(--txt2)" v-if="content.visibility === 'private'"
                        :title="this.content.visibility" />
                    <Icon name="at-sign" size="14px" color="var(--txt2)" v-if="content.visibility === 'direct'"
                        :title="this.content.visibility" />
                </div>
                <div class="post-infoIcon post-infoIcons-created" :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer">
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
        </div>

        <div v-if="content.spoiler_text">
            <div class="cwAlert">
                <Icon type="alert-triangle" size="18px" color="var(--bg-warning)" />
                <p class="cwText">{{ content.spoiler_text }}</p>
                <button class="cwButton" @click="toggleShowCW()">{{ showcwtext }}</button>
            </div>
            <div class="cwContent" v-if="showCwContent">
                <NuxtLink :to="'/toot/' + content.reblog.id" v-if="content.reblog">
                    <span v-html="content.reblog.content" class="post-content"></span>
                </NuxtLink>
                <NuxtLink :to="'/toot/' + content.id" v-if="!content.reblog">
                    <span v-html="content.content" class="post-content"></span>
                </NuxtLink>

                <div class="post-attachments"
                    v-bind:class="{ multiple: this.content.media_attachments.length > 1, three: this.content.media_attachments.length === 3, four: this.content.media_attachments.length === 4 }"
                    v-if="!content.reblog">
                    <div class="post-mediaContainer" v-for="attachment in content.media_attachments">
                        <div class="post-media">
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'image'">
                                <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'image'">
                            </a>
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'video'">
                                <video :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'video'" controls>
                                    <source :src="attachment.url">
                                </video>
                            </a>
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'gifv'">
                                <video :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'gifv'" loop autoplay>
                                    <source :src="attachment.url">
                                </video>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="post-attachments"
                    v-bind:class="{ multiple: this.content.reblog.media_attachments.length > 1, three: this.content.reblog.media_attachments.length === 3, four: this.content.reblog.media_attachments.length === 4 }"
                    v-if="content.reblog">
                    <div class="post-mediaContainer" v-for="attachment in content.reblog.media_attachments">
                        <div class="post-media">
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'image'">
                                <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'image'">
                            </a>
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'video'">
                                <video :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'video'" controls>
                                    <source :src="attachment.url">
                                </video>
                            </a>
                            <a :href="attachment.url" target="_blank" v-if="attachment.type === 'gifv'">
                                <video :alt="attachment.description" :title="attachment.description"
                                    v-if="attachment.type === 'gifv'" loop autoplay>
                                    <source :src="attachment.url">
                                </video>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!content.spoiler_text">
            <NuxtLink :to="'/toot/' + content.reblog.id" v-if="content.reblog">
                <span v-html="content.reblog.content" class="post-content"></span>
            </NuxtLink>
            <NuxtLink :to="'/toot/' + content.id" v-if="!content.reblog">
                <span v-html="content.content" class="post-content"></span>
            </NuxtLink>

            <div class="post-attachments"
                v-bind:class="{ multiple: this.content.media_attachments.length > 1, three: this.content.media_attachments.length === 3, four: this.content.media_attachments.length === 4, visible: this.content.media_attachments.length > 0, }"
                v-if="!content.reblog">
                <div class="post-mediaContainer" v-for="attachment in content.media_attachments">
                    <div class="post-media">
                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'image'">
                            <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'image'">
                        </a>
                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'video'">
                            <video :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'video'" controls>
                                <source :src="attachment.url">
                            </video>
                        </a>
                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'gifv'">
                            <video :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'gifv'" loop autoplay>
                                <source :src="attachment.url">
                            </video>
                        </a>
                    </div>
                </div>
            </div>
            <div class="post-attachments"
                v-bind:class="{ multiple: this.content.reblog.media_attachments.length > 1, three: this.content.reblog.media_attachments.length === 3, four: this.content.reblog.media_attachments.length === 4, visible: this.content.reblog.media_attachments.length > 0 }"
                v-if="content.reblog">
                <div class="post-mediaContainer" v-for="attachment in content.reblog.media_attachments">
                    <div class="post-media">
                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'image'">
                            <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'image'">
                        </a>

                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'video'">
                            <video :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'video'" controls>
                                <source :src="attachment.url" :type="'video'">
                            </video>
                        </a>
                        <a :href="attachment.url" target="_blank" v-if="attachment.type === 'gifv'">
                            <video :alt="attachment.description" :title="attachment.description"
                                v-if="attachment.type === 'gifv'" loop autoplay>
                                <source :src="attachment.url">
                            </video>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="postReactionBar" v-if="content.reactions.length > 0">
            <div v-for="reaction in content.reactions">
                <div class="postReaction" @click="postInteraction('react', content.id)" v-if="!reaction.me">
                    <img :src="reaction.url" :alt="reaction.name" :title="reaction.name" class="emojiReaction"
                        v-if="reaction.url">
                    <span v-if="!reaction.url">{{ reaction.name }}</span>
                    <span class="postReactionCounter">{{ reaction.count }}</span>
                </div>
                <div class="postReaction pRme" @click="postInteraction('unreact', content.id)" v-if="reaction.me">
                    <img :src="reaction.url" :alt="reaction.name" :title="reaction.name" class="emojiReaction"
                        v-if="reaction.url">
                    <span v-if="!reaction.url">{{ reaction.name }}</span>
                    <span class="postReactionCounter">{{ reaction.count }}</span>
                </div>
            </div>
        </div>
        <div class="postInteractionBar" v-if="!content.reblog">
            <button class="postInteraction">
                <Icon type="message-circle" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.replies_count }}
                </span>
            </button>

            <button @click="postInteraction('boost', content.id)" class="postInteraction" v-if="!content.reblogged">
                <Icon type="repeat" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblogs_count }}
                </span>
            </button>
            <button @click="postInteraction('unboost', content.id)" class="postInteraction pIreblogged"
                v-if="content.reblogged">
                <Icon type="repeat" size="18px" color="var(--reblog)" />
                <span>
                    {{ content.reblogs_count }}
                </span>
            </button>

            <button @click="postInteraction('favorite', content.id)" class="postInteraction" v-if="!content.favourited">
                <Icon type="star" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.favourites_count }}
                </span>
            </button>
            <button @click="postInteraction('unfavorite', content.id)" class="postInteraction pIfavorited"
                v-if="content.favourited">
                <Icon type="star" size="18px" color="var(--favorite)" fill=true />
                <span>
                    {{ content.favourites_count }}
                </span>
            </button>

            <button @click="postInteraction('bookmark', content.id)" class="postInteraction" v-if="!content.bookmarked">
                <Icon type="bookmark" size="18px" color="var(--txt2)" />
            </button>
            <button @click="postInteraction('unbookmark', content.id)" class="postInteraction pIbookmarked"
                v-if="content.bookmarked">
                <Icon type="bookmark" size="18px" color="var(--bookmark)" fill=true />
            </button>

            <button class="postInteraction">
                <Icon type="more-horizontal" size="18px" color="var(--txt2)" />
            </button>
        </div>
        <!-- for reblogs -->
        <div class="postInteractionBar" v-if="content.reblog">
            <button class="postInteraction">
                <Icon type="message-circle" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.replies_count }}
                </span>
            </button>

            <button @click="postInteraction('boost', content.id)" class="postInteraction" v-if="!content.reblog.reblogged">
                <Icon type="repeat" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblog.reblogs_count }}
                </span>
            </button>
            <button @click="postInteraction('unboost', content.id)" class="postInteraction pIreblogged"
                v-if="content.reblog.reblogged">
                <Icon type="repeat" size="18px" color="var(--reblog)" />
                <span>
                    {{ content.reblog.reblogs_count }}
                </span>
            </button>

            <button @click="postInteraction('favorite', content.id)" class="postInteraction"
                v-if="!content.reblog.favourited">
                <Icon type="star" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblog.favourites_count }}
                </span>
            </button>
            <button @click="postInteraction('unfavorite', content.id)" class="postInteraction pIfavorited"
                v-if="content.reblog.favourited">
                <Icon type="star" size="18px" color="var(--favorite)" fill=true />
                <span>
                    {{ content.reblog.favourites_count }}
                </span>
            </button>

            <button @click="postInteraction('bookmark', content.id)" class="postInteraction"
                v-if="!content.reblog.bookmarked">
                <Icon type="bookmark" size="18px" color="var(--txt2)" />
            </button>
            <button @click="postInteraction('unbookmark', content.id)" class="postInteraction pIbookmarked"
                v-if="content.reblog.bookmarked">
                <Icon type="bookmark" size="18px" color="var(--bookmark)" fill=true />
            </button>

            <button class="postInteraction">
                <Icon type="more-horizontal" size="18px" color="var(--txt2)" />
            </button>

            <!--

                    open in sidebar
copy link to post
-- if me
Pin on profile
Mute conversation
--
Edit
Delete
Delete & re-draft
-- if not me
mention 
privately mention 
--
mute
block
report

                -->
        </div>
    </div>
</template>

<style>
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
}

.boostAlert {
    color: var(--txt2);
    padding-left: 10px;
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