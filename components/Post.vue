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
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/reblog", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            } else if (type === 'unboost') {
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/unreblog", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            } else if (type === 'favorite') {
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/favourite", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            } else if (type === 'unfavorite') {
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/unfavourite", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            } else if (type === 'bookmark') {
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/bookmark", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            } else if (type === 'unbookmark') {
                const postInteaction = fetch("https://"+this.instanceurl+"/api/v1/statuses/"+id+"/unbookmark", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
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
        <div class="postReactionBar" v-if="content.reactions">
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
        <div class="postInteractionBar">
            <button class="postInteraction">
                <Icon type="message-circle" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.replies_count }}
                </span>
            </button>
            <button @click="postInteraction('boost', content.id)" class="postInteraction" v-bind:class="{ pIrebloggedTrue: this.content.reblogged }">
                <Icon type="refresh-cw" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.reblogs_count }}
                </span>
            </button>
            <button @click="postInteraction('favorite', content.id)" class="postInteraction" v-bind:class="{ pIfavoriteTrue: this.content.favorited }">
                <Icon type="star" size="18px" color="var(--txt2)" />
                <span>
                    {{ content.favourites_count }}
                </span>
            </button>
            <button class="postInteraction">
                <Icon type="plus" size="18px" color="var(--txt2)" />
            </button>
            <button @click="postInteraction('bookmark', content.id)" class="postInteraction" v-bind:class="{ pIbookmarkTrue: this.content.bookmarked }">
                <Icon type="bookmark" size="18px" color="var(--txt2)" />
            </button>
            <button class="postInteraction">
                <Icon type="more-horizontal" size="18px" color="var(--txt2)" />
            </button>
        </div>
    </div>
</template>

<style>
.postReactionBar {
    padding-top: 15px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
}

.postReaction.pRme {
    border-color: var(--accent1)!important;
    background-color: var(--accent1-50);
}

.postReaction {
    padding: 2px;
    padding-left: 6px!important;
    padding-right: 6px!important;

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

.postInteraction span {
    padding-left: 7px;
}

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