<script setup>
import Icon from "../components/Icon.vue";
</script>

<script>
export default {
    data: () => ({
        content: [],
        token: "",
        fr_show: true,
        ready: false,
        showCwContent: false,
        showcwtext: "Show More",
        timer: 0,
    }),
    props: {
        instanceurl: String,
        data: Object,
    },
    mounted() {
        this.content = this.data;
        this.token = this.getLocalStorage("token");
        this.ready = true;
        this.timer = setInterval(() => {
            this.timer += 1;
        }, 5000);
    },
    methods: {
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
            if (seconds == 0) {
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

        async followRequest(response, id) {
            if (response === "accept") {
                const acceptfollowrequest = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/follow_requests/" +
                        id +
                        "/authorize",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );
                const acceptfollowrequest_response =
                    await acceptfollowrequest.json();

                this.fr_show = false;

                console.log(acceptfollowrequest_response);
            } else if (response === "deny") {
                const denyfollowrequest = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/follow_requests/" +
                        id +
                        "/reject",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );
                const denyfollowrequest_response =
                    await denyfollowrequest.json();

                this.fr_show = false;

                console.log(denyfollowrequest_response);
            }
        },

        async toggleShowCW() {
            if (this.showCwContent === true) {
                this.showCwContent = false;
                this.showcwtext = "Show More";
            } else {
                this.showCwContent = true;
                this.showcwtext = "Show Less";
            }
        },
    },
};
</script>

<template>
    <div class="post" v-if="ready && fr_show">
        <div>
            <div class="notificationTop" v-if="content.type === 'favourite'">
                <Icon
                    type="star"
                    size="18px"
                    color="var(--favorite)"
                    fill="true"
                />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{
                            content.account.display_name
                        }}</span></NuxtLink
                    >
                    favorited your post
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'reblog'">
                <Icon type="repeat" size="18px" color="var(--reblog)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    boosted your post
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'follow'">
                <Icon type="user-plus" size="18px" color="var(--accent1)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    followed you
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'mention'">
                <Icon type="at-sign" size="18px" color="var(--accent1)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    mentioned you
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'status'">
                <Icon
                    type="message-circle"
                    size="18px"
                    color="var(--accent1)"
                />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    published a toot
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'poll'">
                <Icon type="bar-chart-2" size="18px" color="var(--accent1)" />
                <span>A poll you're involved in has ended</span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'reaction'">
                <Icon type="plus" size="18px" color="var(--accent1)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    reacted to your post
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div
                class="notificationTop"
                v-if="content.type === 'follow_request'"
            >
                <Icon type="user" size="18px" color="var(--accent1)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    requested to follow you
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>
            <div class="notificationTop" v-if="content.type === 'update'">
                <Icon type="edit-3" size="18px" color="var(--accent1)" />
                <span>
                    <NuxtLink
                        class="notificationMention"
                        :to="'/@' + content.account.acct"
                        ><span>{{ content.account.display_name }}</span>
                    </NuxtLink>
                    edited a toot
                </span>
                <div
                    class="post-infoIcon post-infoIcons-created"
                    :title="new Date(content.created_at).toLocaleDateString()"
                    :key="timer"
                >
                    {{ timeAgo(content.created_at) }}
                </div>
            </div>

            <!---->

            <div class="notificationStatus" v-if="content.type === 'favourite'">
                <span v-html="content.status.content"></span>
            </div>
            <div class="notificationStatus" v-if="content.type === 'reblog'">
                <span v-html="content.status.content"></span>
            </div>
            <div class="notificationStatus" v-if="content.type === 'mention'">
                <div v-if="content.status.spoiler_text">
                    <div class="cwAlert">
                        <Icon
                            type="alert-triangle"
                            size="18px"
                            color="var(--bg-warning)"
                        />
                        <p class="cwText">{{ content.status.spoiler_text }}</p>
                        <button class="cwButton" @click="toggleShowCW()">
                            {{ showcwtext }}
                        </button>
                    </div>
                    <div v-if="showCwContent">
                        <span v-html="content.status.content"></span>
                    </div>
                </div>
                <div v-if="!content.status.spoiler_text">
                    <div>
                        <span v-html="content.status.content"></span>
                    </div>
                </div>
            </div>
            <div class="notificationStatus" v-if="content.type === 'status'">
                <div v-if="content.status.spoiler_text">
                    <div class="cwAlert">
                        <Icon
                            type="alert-triangle"
                            size="18px"
                            color="var(--bg-warning)"
                        />
                        <p class="cwText">{{ content.status.spoiler_text }}</p>
                        <button class="cwButton" @click="toggleShowCW()">
                            {{ showcwtext }}
                        </button>
                    </div>
                    <div v-if="showCwContent">
                        <span v-html="content.status.content"></span>
                    </div>
                </div>
                <div v-if="!content.status.spoiler_text">
                    <div>
                        <span v-html="content.status.content"></span>
                    </div>
                </div>
            </div>
            <div class="notificationStatus" v-if="content.type === 'poll'">
                <span
                    v-html="
                        '@' +
                        content.account.acct +
                        ':' +
                        content.status.content
                    "
                ></span>
            </div>
            <div class="notificationStatus" v-if="content.type === 'reaction'">
                <span v-html="content.status.content"></span>
                <div class="postReactionBar">
                    <div v-for="reaction in content.status.reactions">
                        <div class="postReaction">
                            <img
                                :src="reaction.url"
                                :alt="reaction.name"
                                :title="reaction.name"
                                class="emojiReaction"
                                v-if="reaction.url"
                            />
                            <span class="emojiReaction" v-if="!reaction.url">{{
                                reaction.name
                            }}</span>
                            <span class="postReactionCounter">{{
                                reaction.count
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="notificationStatus"
                v-if="content.type === 'follow_request'"
            >
                <div class="notificationAttachmentContainer">
                    <NuxtLink
                        class="notificationAttachment acceptFollowRequests"
                        @click="followRequest('accept', content.account.id)"
                        >Accept</NuxtLink
                    >
                    <NuxtLink
                        class="notificationAttachment denyFollowRequests"
                        @click="followRequest('deny', content.account.id)"
                        >Deny</NuxtLink
                    >
                </div>
            </div>
            <div class="notificationStatus" v-if="content.type === 'update'">
                <span v-html="content.status.content"></span>
                <div class="notificationAttachmentContainer">
                    <NuxtLink
                        class="notificationAttachment"
                        :to="'/toot/' + content.status.id"
                        >View Toot</NuxtLink
                    >
                </div>
            </div>
        </div>
        <div
            v-if="
                content.type !== 'reblog' &&
                content.type !== 'favourite' &&
                content.type !== 'follow' &&
                content.type !== 'mention' &&
                content.type !== 'status' &&
                content.type !== 'poll' &&
                content.type !== 'reaction' &&
                content.type !== 'follow_request' &&
                content.type !== 'update'
            "
        >
            <div class="notificationTop">
                <Icon
                    type="alert-circle"
                    size="18px"
                    color="var(--bg-danger)"
                />
                <span
                    >Unknown notification type {{ content.type }}. Please report
                    this as a bug on
                    <a
                        href="https://github.com/ihateblueb/aster"
                        target="_blank"
                        >the Aster GitHub repo</a
                    >.</span
                >
            </div>
        </div>
    </div>
</template>

<style>
.notificationTop {
    display: flex;
}

.notificationTop span {
    flex-grow: 3;
}

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
    text-wrap: wrap;
    overflow-wrap: break-word;
}

.notificationTop .notificationMention {
    word-break: break-all;
}

.notificationTop .vue-feather {
    padding-right: 10px;
}

.notificationTop .vue-feather {
    min-width: 18px;
    margin-bottom: 0px;
}
</style>
