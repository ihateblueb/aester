<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        content: [],
        token: "",
        fr_notaccepted: true,
        ready: false,
        showCwContent: false
    }),
    props: {
        instanceurl: String,
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.token = this.getLocalStorage("token")
        this.ready = true
    },
    methods: {
        setLocalStorage(key, value) {
            if (process.client) {
                localStorage.setItem(key, value)
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

        async followRequest(response, id) {
            if (response === 'accept') {
                const acceptfollowrequest = await fetch("https://" + this.instanceurl + "/api/v1/follow_requests/" + id + "/authorize", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                const acceptfollowrequest_response = await acceptfollowrequest.json()

                this.fr_notaccepted = false

                console.log(acceptfollowrequest_response)
            } else if (response === 'deny') {
                const denyfollowrequest = await fetch("https://" + this.instanceurl + "/api/v1/follow_requests/" + id + "/reject", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                const denyfollowrequest_response = await denyfollowrequest.json()

                this.fr_notaccepted = true

                console.log(denyfollowrequest_response)
            }
        }
    }
}
</script>

<template>
    <div class="post" v-if="ready && fr_notaccepted">
        <div v-if="content.type === 'favourite'">
            <div class="notificationTop">
                <Icon type="star" size="18px" color="var(--favorite)" fill=true />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> favorited your post</span>
            </div>
            <div class="notificationStatus">
                <span v-html="content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'reblog'">
            <div class="notificationTop">
                <Icon type="repeat" size="18px" color="var(--reblog)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> boosted your post</span>
            </div>
            <div class="notificationStatus">
                <span v-html="content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'follow'">
            <div class="notificationTop">
                <Icon type="user-plus" size="18px" color="var(--accent1)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> followed you</span>
            </div>
        </div>
        <div v-if="content.type === 'mention'">
            <div class="notificationTop">
                <Icon type="at-sign" size="18px" color="var(--accent1)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> mentioned you</span>
            </div>
            <div class="notificationStatus">
                <span v-html="content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'status'">
            <div class="notificationTop">
                <Icon type="message-circle" size="18px" color="var(--accent1)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> published a toot</span>
            </div>
            <div class="notificationStatus">
                <span v-html="content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'poll'">
            <div class="notificationTop">
                <Icon type="bar-chart-2" size="18px" color="var(--accent1)" />
                <span>A poll you have voted in has ended</span>
            </div>
            <div class="notificationStatus">
                <span v-html="'@' + content.account.acct + ':' + content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'reaction'">
            <div class="notificationTop">
                <Icon type="plus" size="18px" color="var(--accent1)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> reacted to your post</span>
            </div>
            <div class="notificationStatus">
                <span v-html="content.status.content"></span>
            </div>
        </div>
        <div v-if="content.type === 'follow_request'">
            <div class="notificationTop">
                <Icon type="user" size="18px" color="var(--accent1)" />
                <span><NuxtLink class="notificationMention" :to="'/@'+content.account.acct">{{ content.account.display_name }}</NuxtLink> requested to follow you</span>
            </div>
            <div class="notificationStatus">
                <a class="acceptFollowRequest" @click="followRequest('accept', content.account.id)">Accept</a><a class="denyFollowRequest" @click="followRequest('deny', content.account.id)">Deny</a>
            </div>
        </div>
        <div
            v-if="content.type !== 'reblog' && this.content.type !== 'favourite' && this.content.type !== 'follow' && this.content.type !== 'mention' && this.content.type !== 'status' && this.content.type !== 'poll' && this.content.type !== 'reaction' && this.content.type !== 'follow_request'">
            <div class="notificationTop">
                <Icon type="alert-circle" size="18px" color="var(--bg-danger)" />
                <span>{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<style>
.denyFollowRequest {
    color: var(--bg-danger);
    cursor: pointer;
    margin-left: 5px;
}
.acceptFollowRequest {
    color: var(--bg-success);
    cursor: pointer;
    margin-right: 5px;
}

.notificationTop {
    font-size: 16px;
}

.notificationTop span {
    padding-left: 10px;
}

.notificationTop .vue-feather {
    min-width: 18px;
    margin-bottom: 0px;
}
</style>