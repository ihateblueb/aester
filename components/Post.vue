<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        content: [],
        ready: false,
        showCwContent: false
    }),
    props: {
        instanceurl: String,
        token: String,
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.ready = true
    },
    methods: {
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
            } else {
                this.showCwContent = true;
            }
        }
    }
}
</script>

<template>
    <div class="post" v-if="this.ready">
        <div class="boostAlertContainer" v-if="content.reblog">
            <Icon class="boostAlertIcon" name="refresh-cw" size="14px" color="var(--txt2)" />
            <span class="boostAlert">{{ content.account.display_name }} boosted</span>
        </div>
        <div class="post-userInfo">
            <div class="post-userAvatars">
                <img class="post-userAvatar" :src="content.account.avatar" loading="lazy" v-if="!content.reblog">
                <img class="post-userAvatar" :src="content.reblog.account.avatar" loading="lazy" v-if="content.reblog">
            </div>
            <div class="post-userNames">
                <a :href="'/@' + content.account.acct" v-if="!content.reblog" class="post-displayName">{{
                    content.account.display_name }}</a>
                <a :href="'/@' + content.account.acct" v-if="!content.reblog" class="post-userName">@{{ content.account.acct
                }}</a>
                <a :href="'/@' + content.reblog.account.acct" v-if="content.reblog" class="post-displayName">{{
                    content.reblog.account.display_name }}</a>
                <a :href="'/@' + content.reblog.account.acct" v-if="content.reblog" class="post-userName">@{{
                    content.reblog.account.acct }}</a>
            </div>
        </div>

        <div v-if="content.spoiler_text">
            <div class="cwAlert">
                <Icon type="alert-triangle" size="18px" color="var(--bg-warning)" />
                <p class="cwText">{{ content.spoiler_text }}</p>
                <button class="cwButton" @click="toggleShowCW()">Show More</button>
            </div>
            <div class="cwContent" v-if="this.showCwContent">
                <span v-html="content.reblog.content" class="post-content" v-if="content.reblog"></span>
                <span v-html="content.content" class="post-content" v-if="!content.reblog"></span>
            </div>
        </div>
        <div v-if="!content.spoiler_text">
            <span v-html="content.reblog.content" class="post-content" v-if="content.reblog"></span>
            <span v-html="content.content" class="post-content" v-if="!content.reblog"></span>
        </div>

        <div class="post-attachments"
            v-bind:class="{ multiple: this.content.media_attachments.length > 1, three: this.content.media_attachments.length === 3, four: this.content.media_attachments.length === 4 }"
            v-if="!content.reblog">
            <div class="post-mediaContainer" v-for="attachment in content.media_attachments">
                <div class="post-media">
                    <a :href="attachment.url" target="_blank" v-if="attachment.type === 'image'">
                        <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                            v-if="attachment.type === 'image'">
                    </a>
                </div>
            </div>
        </div>
        <div class="post-attachments"
            v-bind:class="{ multiple: this.content.reblog.media_attachments.length > 1, three: this.content.reblog.media_attachments.length === 3, four: this.content.reblog.media_attachments.length === 4 }"
            v-if="content.reblog">
            <div class="post-mediaContainer" v-for="attachment in content.reblog.media_attachments">
                <div class="post-media">
                    <a :href="attachment.url" target="_blank">
                        <img :src="attachment.url" :alt="attachment.description" :title="attachment.description"
                            v-if="attachment.type === 'image'">
                    </a>
                </div>
            </div>
        </div>

        <div class="postReactionBar" v-if="content.reactions.length > 0">
            <div v-for="reaction in content.reactions">
                <div class="postReaction" @click="postInteraction('react', content.id)" v-if="!reaction.me">
                    <span>{{ reaction.name }}</span>
                    <span class="postReactionCounter">{{ reaction.count }}</span>
                </div>
                <div class="postReaction pRme" @click="postInteraction('unreact', content.id)" v-if="reaction.me">
                    <span>{{ reaction.name }}</span>
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
                <Icon type="refresh-cw" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblogs_count }}
                </span>
            </button>
            <button @click="postInteraction('unboost', content.id)" class="postInteraction pIreblogged"
                v-if="content.reblogged">
                <Icon type="refresh-cw" size="18px" color="var(--reblog)" />
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

            <button class="postInteraction">
                <Icon type="plus" size="18px" color="var(--txt2)" />
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
                <Icon type="refresh-cw" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblog.reblogs_count }}
                </span>
            </button>
            <button @click="postInteraction('unboost', content.id)" class="postInteraction pIreblogged"
                v-if="content.reblog.reblogged">
                <Icon type="refresh-cw" size="18px" color="var(--reblog)" />
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

            <button class="postInteraction">
                <Icon type="plus" size="18px" color="var(--txt2)" />
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
    padding: 2px;
    padding-left: 6px !important;
    padding-right: 6px !important;

    border: 2px solid var(--bg4);
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

.post-userNames {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.post-userName {
    font-size: 14px;
    color: var(--txt2);
    text-decoration: none;
    text-wrap: wrap;
    overflow-wrap: break-word;
}

.post-displayName {
    color: var(--txt1);
    text-decoration: none;
    text-wrap: wrap;
    overflow-wrap: break-word;
}

.post-content {
    text-wrap: wrap;
    overflow-wrap: break-word;
}

.post-mediaContainer {
    box-sizing: border-box;
    max-height: 200px;
    min-height: 100px;
    display: flex;
    background-color: #000000;
    justify-content: space-around;
    align-content: center;
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

.post-attachments {
    margin-top: 15px;
}

.post-attachments.multiple {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.post-attachments.three {
    grid-template-columns: repeat(3, 1fr) !important;
}

.post-attachments.four img {
    max-height: 100px;
}

.post-attachments.four video {
    max-height: 100px !important;
}

.post-attachments .post-mediaContainer {
    background-color: #000000;
    border: 1px solid var(--bg2);
}
</style>