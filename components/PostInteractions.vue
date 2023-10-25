<script>
export default {
    data: () => ({
        content: [],
        ready: false
    }),
    props: {
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.instanceurl = this.getLocalStorage("instanceurl")
        this.token = this.getLocalStorage("token")

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

        async postInteraction(type, id) {
            if (type === "reply") {
                this.setLocalStorage("replyingto", id);
            } else if (type === "boost") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/reblog",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            } else if (type === "unboost") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/unreblog",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            } else if (type === "favorite") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/favourite",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            } else if (type === "unfavorite") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/unfavourite",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            } else if (type === "bookmark") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/bookmark",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            } else if (type === "unbookmark") {
                let response = await fetch(
                    "https://" +
                        this.instanceurl +
                        "/api/v1/statuses/" +
                        id +
                        "/unbookmark",
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );

                if (response.status === 200) {
                    this.content = await response.json();
                } else {
                    console.log(
                        (await type) +
                            " failed. " +
                            response.status +
                            " " +
                            response.statusText
                    );
                }
            }
        },
    }
};
</script>

<template>
    <div class="postInteractionBar" v-if="ready">
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
            <Icon type="star" size="18px" color="var(--favorite)" fill="true" />
            <span>
                {{ content.favourites_count }}
            </span>
        </button>

        <button @click="postInteraction('bookmark', content.id)" class="postInteraction" v-if="!content.bookmarked">
            <Icon type="bookmark" size="18px" color="var(--txt2)" />
        </button>
        <button @click="postInteraction('unbookmark', content.id)" class="postInteraction pIbookmarked"
            v-if="content.bookmarked">
            <Icon type="bookmark" size="18px" color="var(--bookmark)" fill="true" />
        </button>

        <button class="postInteraction">
            <Icon type="more-horizontal" size="18px" color="var(--txt2)" />
        </button>
    </div>
</template>

<style>
.media {
    color: var(--txt2);
}
</style>