<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        e: "none",
    }),
    props: {
        instanceurl: String,
        token: String,
        content: Object,
    },
    methods: {
        async postInteraction(type, id) {
            if (type === 'boost') {
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/reblog", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.reblogged = true
                        } else {
                            this.content.reblogged = true
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            } else if (type === 'unboost') {                
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unreblog", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.reblogged = false
                        } else {
                            this.content.reblogged = false
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            } else if (type === 'favorite') {
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/favourite", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.favourited = true
                        } else {
                            this.content.favourited = true
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            } else if (type === 'unfavorite') {
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unfavourite", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.favourited = false
                        } else {
                            this.content.favourited = false
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            } else if (type === 'bookmark') {
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/bookmark", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.bookmarked = true
                        } else {
                            this.content.bookmarked = true
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            } else if (type === 'unbookmark') {
                await fetch("https://" + this.instanceurl + "/api/v1/statuses/" + id + "/unbookmark", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        if (this.content.reblog) {
                            this.content.reblog.bookmarked = false
                        } else {
                            this.content.bookmarked = false
                        }
                    } else {
                        console.log(type+" failed. "+response.status+" "+response.statusText)
                    }
                });
            }
        }
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
                <img class="post-userAvatar" :src="content.account.avatar" loading="lazy" v-if="!content.reblog">
                <img class="post-userAvatar" :src="content.reblog.account.avatar" loading="lazy" v-if="content.reblog">
            </div>
            <div class="post-userNames">
                <span v-if="!content.reblog">{{ content.account.display_name }}</span>
                <span v-if="!content.reblog" class="post-userName">@{{ content.account.acct }}</span>
                <span v-if="content.reblog">{{ content.reblog.account.display_name }}</span>
                <span v-if="content.reblog" class="post-userName">@{{ content.reblog.account.acct }}</span>
            </div>
        </div>
        <span v-html="content.reblog.content" v-if="content.reblog"></span>
        <div v-for="attatchment in content.reblog.media_attatchments" v-if="content.reblog">
            <span>{{ attatchment }}</span>
        </div>
        <div v-for="attatchment in content.media_attatchments" v-if="!content.reblog">
            <img :src="attatchment.url" :alt="attatchment.descriotion" :title="attatchment.descriotion">
        </div>
        <span v-html="content.content" v-if="!content.reblog"></span>
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
                <Icon type="bookmark" size="18px"  color="var(--bookmark)" fill=true />
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

            <button @click="postInteraction('favorite', content.id)" class="postInteraction" v-if="!content.reblog.favourited">
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

            <button @click="postInteraction('bookmark', content.id)" class="postInteraction" v-if="!content.reblog.bookmarked">
                <Icon type="bookmark" size="18px" color="var(--txt2)" />
            </button>
            <button @click="postInteraction('unbookmark', content.id)" class="postInteraction pIbookmarked"
                v-if="content.reblog.bookmarked">
                <Icon type="bookmark" size="18px"  color="var(--bookmark)" fill=true />
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

.postInteraction.pIbookmarked span, .postInteraction.pIbookmarked {
    color: var(--bookmark) !important;
}
.postInteraction.pIreblogged span {
    color: var(--reblog) !important;
}
.postInteraction.pIfavorited span, .postInteraction.pIbookmarked {
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
}</style>