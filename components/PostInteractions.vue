<script setup>
import {
    VTooltip,
    VClosePopper,
    Dropdown,
    Tooltip,
    Menu
} from 'floating-vue'
import 'floating-vue/dist/style.css'
</script>

<script>
export default {
    data: () => ({
        content: [],
        isSelf: false,
        ready: false
    }),
    props: {
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.instanceurl = this.getLocalStorage("instanceurl")
        this.token = this.getLocalStorage("token")
        this.self = this.getLocalStorage("user_id")

        if (this.content.account.id === this.self) {
            this.isSelf = true;
        }

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
        async moreAction(type) {
            // open, original, copy link, 
            // not self: filter, mute, block, report
            // self: pin, edit, delete
            if (type === "open") {
                alert("This is a work in progress. [open]")
            } else if (type === "original") {
                alert("This is a work in progress. [original]")
            } else if (type === "copylink") {
                alert("This is a work in progress. [copylink]")
            } else if (type === "filter") {
                alert("This is a work in progress. [filter]")
            } else if (type === "mute") {
                alert("This is a work in progress. [mute]")
            } else if (type === "block") {
                alert("This is a work in progress. [block]")
            } else if (type === "report") {
                alert("This is a work in progress. [report]")
            } else if (type === "pin") {
                alert("This is a work in progress. [pin]")
            } else if (type === "edit") {
                alert("This is a work in progress. [edit]")
            } else if (type === "delete") {
                alert("This is a work in progress. [delete]")
            }
        }
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
                {{

                    s_count }}
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
            <Dropdown>
                <Icon type="more-horizontal" size="18px" color="var(--txt2)" />

                <template #popper>
                    <div class="moreOptions" v-if="!isSelf">
                        <div class="moreOption" @click="moreAction('open')">
                            Open this post
                        </div>
                        <div class="moreOption" @click="moreAction('original')">
                            Open original post
                        </div>
                        <div class="moreOption" @click="moreAction('copylink')">
                            Copy link to post
                        </div>
                        <hr>
                        <div class="moreOption danger" @click="moreAction('filter')">
                            Filter this post
                        </div>
                        <hr>
                        <div class="moreOption danger" @click="moreAction('mute')">
                            Mute @{{ content.account.acct }}
                        </div>
                        <div class="moreOption danger" @click="moreAction('block')">
                            Block @{{ content.account.acct }}
                        </div>
                        <div class="moreOption danger" @click="moreAction('report')">
                            Report @{{ content.account.acct }}
                        </div>
                    </div>
                    <div class="moreOptions" v-if="isSelf">
                        <div class="moreOption" @click="moreAction('open')">
                            Open this post
                        </div>
                        <div class="moreOption" @click="moreAction('original')">
                            Open original post
                        </div>
                        <div class="moreOption" @click="moreAction('copylink')">
                            Copy link to post
                        </div>
                        <hr>
                        <div class="moreOption" @click="moreAction('pin')">
                            Pin on profile
                        </div>
                        <hr>
                        <div class="moreOption danger" @click="moreAction('edit')">
                            Edit
                        </div>
                        <div class="moreOption danger" @click="moreAction('delete')">
                            Delete
                        </div>
                    </div>
                </template>
            </Dropdown>
        </button>
    </div>
</template>

<style>
.moreOption {
    padding: 6px 12px;
    margin: 4px;

    color: var(--txt1);
    border-radius: 5px;
    min-width: 150px !important;

    cursor: pointer;

    &:hover {
        background-color: var(--bg4-50);
    }

    &.danger {
        color: var(--bg-danger);
    }

    &.danger:hover {
        background-color: var(--bg-danger-25);
    }
}
.moreOptions hr {
    margin: 5px 10px;
    border-width: 1px;
    border-color: var(--bg4) !important;
}</style>