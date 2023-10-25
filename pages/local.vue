<script setup>
import Icon from "../components/Icon.vue";
import Post from "../components/Post.vue";
</script>

<script>
export default {
    data: () => ({
        instanceurl: "",
        token: "",
        timeline: {
            local: [],
            local_new: [],
            local_last: "",
        },
    }),
    mounted() {
        this.token = this.getLocalStorage("token");
        this.instanceurl = this.getLocalStorage("instanceurl");

        this.ready = true;

        this.loadToots();
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

        async loadToots() {
            let initialtoots = await fetch(
                "https://" +
                this.instanceurl +
                "/api/v1/timelines/public?local=true",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let initialtoots_response = await initialtoots.json();

            initialtoots_response.forEach(
                (element) =>
                    this.timeline.local.push(element) && console.log(element)
            );

            this.timeline.local_last = initialtoots_response.at(-1).id;

            this.startStream();
        },
        async loadMoreToots(id) {
            let moretoots = await fetch(
                "https://" +
                this.instanceurl +
                "/api/v1/timelines/public?local=true&max_id=" +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let moretoots_response = await moretoots.json();

            moretoots_response.forEach((element) =>
                this.timeline.local_new.push(element)
            );

            this.timeline.local_last = moretoots_response.at(-1).id;
        },

        async startStream() {
            let userSocket = new WebSocket(
                "wss://" +
                this.instanceurl +
                "/api/v1/streaming/public/?stream=public:local&access_token=" +
                this.token
            );

            userSocket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                console.log(msg.event);

                if (msg.event === "update") {
                    this.timeline.local_new.push(JSON.parse(msg.payload));
                }
            };
        },
        async onLocalScroll(e) {
            const { scrollTop, offsetHeight, scrollHeight } = e.target;
            if (scrollTop + offsetHeight >= scrollHeight) {
                this.loadMoreToots(this.timeline.local_last);
            }
        },
    },
};
</script>

<template>
    <div class="mColumnHeader">
        <div class="mCH-left">
            <div class="mCH-text">
                <p>Local Timeline</p>
            </div>
        </div>
        <div class="mCH-buttons">
            <NuxtLink to="/about" class="btn btn-header">
                <Icon name="info" size="16px" />
            </NuxtLink>
            <NuxtLink to="/" class="btn btn-header">
                <Icon name="home" size="16px" />
            </NuxtLink>
        </div>
    </div>
    <div class="mColumnContent" @scroll="onLocalScroll">
        <div class="timelineNewPosts">
            <div v-for="toot in timeline.local_new">
                <Post :data="toot" :instanceurl="instanceurl" :token="token" />
            </div>
        </div>
        <div v-for="toot in timeline.local">
            <Post :data="toot" :instanceurl="instanceurl" :token="token" />
        </div>
    </div>
</template>

<style></style>
