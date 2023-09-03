<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        fillcolor: "none",
    }),
    props: {
        instanceurl: String,
        token: String,
        content: Object,
    },
    created() {
        console.log("one post!")
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
        <div v-for="attatchment in content.reblog.media_attatchments" v-if="content.reblog">
            <span>{{ attatchment }}</span>
        </div>
        <div v-for="attatchment in content.media_attatchments" v-if="!content.reblog">
            <img :src="attatchment.url" :alt="attatchment.descriotion" :title="attatchment.descriotion">
        </div>
        <span v-html="content.content" v-if="!content.reblog"></span>
        <div>
            <button @click="postInteraction('boost', content.id)">boost</button>
            <button @click="postInteraction('favorite', content.id)">favorite</button>
            <button @click="postInteraction('bookmark', content.id)">bookmark</button>
        </div>
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