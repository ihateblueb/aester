<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        ready: false,
        token: "",
        instanceurl: "",
        acct: "",
        selfid: "",
        user: {},
        relationships: {},
        timeline: {
            pins: [],
            profile: [],
            profile_new: [],
            profile_last: "",
        }
    }),
    mounted() {
        this.selfid = this.getLocalStorage("user_id")
        this.instanceurl = this.getLocalStorage("instanceurl")
        this.token = this.getLocalStorage("token")
        this.acct = this.$route.params.userid

        this.getOtherUserDetails()

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

        async getOtherUserDetails() {
            const getotheruserdetails = await fetch("https://" + this.instanceurl + "/api/v1/accounts/lookup/?acct=" + this.acct, {
                method: "GET"
            })
            const getotheruserdetails_response = await getotheruserdetails.json()

            this.user = getotheruserdetails_response

            console.log(getotheruserdetails_response)

            this.getRelationships()
            this.loadPins()
            this.loadToots()
        },

        async getRelationships() {
            const getrelationships = await fetch("https://" + this.instanceurl + "/api/v1/accounts/relationships/?id=" + this.user.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            const getrelationships_response = await getrelationships.json()

            this.relationships = getrelationships_response[0]

            console.log(getrelationships_response[0])
        },

        async userInteraction(type) {
            if (type === 'follow') {
                const sendinteraction = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/follow", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                const sendinteraction_response = await sendinteraction.json()

                if (sendinteraction_response.following === true) {
                    this.getRelationships()
                }
            } else if (type === 'unfollow') {
                const sendinteraction = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/unfollow", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                    }
                })
                const sendinteraction_response = await sendinteraction.json()

                if (sendinteraction_response.following === false) {
                    this.getRelationships()
                }
            }
        },

        async loadPins() {
            let pinnedtoots = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/statuses?pinned=true&limit=40", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let pinnedtoots_response = await pinnedtoots.json()

            pinnedtoots_response.forEach((element) =>
                this.timeline.pins.push(element) &&
                console.log(element)
            )
        },
        async loadToots() {
            let initialtoots = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/statuses?limit=40", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let initialtoots_response = await initialtoots.json()

            initialtoots_response.forEach((element) =>
                this.timeline.profile.push(element) &&
                console.log(element)
            )

            this.timeline.profile_last = initialtoots_response.at(-1).id;

            this.startStream()
        },
        async loadMoreToots(id) {
            let moretoots = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/statuses?max_id=" + id + "?limit=40", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let moretoots_response = await moretoots.json()

            moretoots_response.forEach((element) =>
                this.timeline.profile.push(element)
            )

            this.timeline.profile_last = moretoots_response.at(-1).id;
        },

        async onProfileScroll(e) {
            const { scrollTop, offsetHeight, scrollHeight } = e.target
            if ((scrollTop + offsetHeight) >= scrollHeight) {
                this.loadMoreToots(this.timeline.profile_last)
            }
        },

        replaceEmojis(content) {
            let emojiregex = /:[^:\s]*(?:::[^:\s]*)*:/g;
            let emojimatches = Array.from(content.matchAll(emojiregex))
            console.log(emojimatches)
            const emojis = this.user.emojis
            let i = 0 // it cant be inside the return part for some reason
            return content.replace(emojiregex, function () {
                let emoji = emojimatches[(i++)].toString()
                return `<img src="${emojis.find((element) => { console.log(element.url); return element.url.toString() })}" alt="${emoji}" title="${emoji}" class="emojiReaction">`
                // ${emoji.replaceAll(":", "")}
                // <img :src="reaction.url" :alt="reaction.name" :title="reaction.name" class="emojiReaction" v-if="reaction.url"> 
            })
        }
    }
}

</script>

<template>
    <div class="mColumnHeader" v-if="ready === true">
        <div class="mCH-left">
            <div class="mCH-text">
                <p v-html="replaceEmojis(user.display_name)"></p>
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
    <div class="mColumnContent" @scroll="onProfileScroll" v-if="ready">
        <div class="mCC-profileHeading">
            <div class="mCC-accountHeaderContainer">
                <img class="mCC-accountHeader" :src="this.user.header">
            </div>
            <div>
                <div class="mCC-headerTop">
                    <div class="mCC-hT-left">
                        <img class="mCC-accountPicture" :src="this.user.avatar">
                    </div>
                    <div class="mCC-hT-right">
                        <NuxtLink to="settings/account" v-if="user.id === selfid">
                            <button class="mCC-button edit">Edit Profile</button>
                        </NuxtLink>
                        <button class="mCC-button follow" v-if="user.id !== selfid && !relationships.following"
                            @click="userInteraction('follow')">Follow</button>
                        <button class="mCC-button unfollow" v-if="user.id !== selfid && relationships.following"
                            @click="userInteraction('unfollow')">Unfollow</button>
                        <button class="mCC-button bell" v-if="user.id !== selfid">
                            <Icon type="bell" size="20px" />
                        </button>
                    </div>
                </div>
                <div class="mCC-headerBottom">
                    <p class="mCC-accountDisplayName" v-html="replaceEmojis(user.display_name)"></p>
                    <p class="mCC-accountUserName">@{{ user.acct }}</p>
                    <div class="mCC-followsYouContainer" v-if="relationships.followed_by">
                        <span class="mCC-followsYou" v-if="!relationships.following">
                            Follows You
                        </span>
                        <span class="mCC-followsYou mutuals" v-if="relationships.following">
                            Mutuals
                        </span>
                    </div>
                    <div class="mCC-hb-bio">
                        <p v-html="replaceEmojis(user.note)"></p>
                    </div>
                    <div class="mCC-hb-fields">
                        <div class="mCC-hb-field" v-for="field in user.fields">
                            <div v-if="field.verified_at">
                                <span class="mCC-hb-fieldName verified" :title="field.name"
                                    v-html="replaceEmojis(field.name)"></span>
                                <span class="mCC-hb-fieldValue verified" :title="field.value"
                                    v-html="replaceEmojis(field.value)"></span>
                                <Icon class="verifiedIcon" type="check" size="14px" color="var(--bg-success)" />
                            </div>
                            <div v-if="!field.verified_at">
                                <span class="mCC-hb-fieldName" :title="field.name"
                                    v-html="replaceEmojis(field.name)"></span>
                                <span class="mCC-hb-fieldValue" :title="field.value"
                                    v-html="replaceEmojis(field.value)"></span>
                            </div>
                        </div>
                    </div>
                    <div class="mCC-stats">
                        <div class="stat">
                            <strong>{{ user.statuses_count }}</strong><br>posts
                        </div>
                        <div class="stat">
                            <strong>{{ user.following_count }}</strong><br>following
                        </div>
                        <div class="stat">
                            <strong>{{ user.followers_count }}</strong><br>followers
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mCC-userPinned">
            <div v-for="toot in this.timeline.pins">
                <Post :data="toot" :instanceurl="this.instanceurl" :token="this.token" pinned=true />
            </div>
        </div>
        <div class="mCC-userContent">
            <div>
                <div class="timelineNewPosts">
                    <div v-for="toot in this.timeline.profile_new">
                        <Post :data="toot" :instanceurl="this.instanceurl" :token="this.token" />
                    </div>
                </div>
                <div v-for="toot in this.timeline.profile">
                    <Post :data="toot" :instanceurl="this.instanceurl" :token="this.token" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.mCC-profileHeading {
    border-bottom: 1px solid var(--bg1);
}

.mCC-stats .stat:first-child {
    border-radius: 10px 0px 0px 10px;
}

.mCC-stats .stat:last-child {
    border-radius: 0px 10px 10px 0px;
}

.mCC-stats .stat {
    background-color: var(--bg3);
    padding: 7px 12px 7px 12px;
    border: 1px solid var(--bg2);
}

.mCC-stats {
    display: flex;
    justify-content: center;
    color: var(--txt2);
    margin-top: 15px;
}



.mCC-followsYou.mutuals {
    color: var(--bg-success);
    background-color: var(--bg-success-25);
}

.mCC-followsYouContainer {
    margin-top: 8px;
}

.mCC-followsYou {
    background-color: var(--bg3);
    padding: 2px 7px 2px 7px;
    font-size: 14px;
    border-radius: 7px;
    color: var(--txt2);
}


.mCC-button.edit:hover {
    border-color: transparent;
    background-color: var(--accent1-25);
    color: var(--accent1);
}

.mCC-button.follow:hover {
    border-color: transparent;
    background-color: var(--accent1-50);
    color: var(--accent1);
}

.mCC-button.unfollow:hover {
    border-color: transparent;
    background-color: var(--bg-danger-50);
    color: var(--bg-danger);
}


.mCC-hb-field:last-child {
    margin-bottom: 0px;
}

.mCC-hb-field {
    margin-bottom: 2px;
    overflow-wrap: break-word;
}

.mCC-hb-fieldValue {
    color: var(--txt1);
}

.mCC-hb-fieldName {
    color: var(--txt2);
    margin-right: 5px;
}

.mCC-hb-fields {
    margin-top: 15px;
}

.mCC-hb-bio p:last-child {
    margin-bottom: 0px;
}

.mCC-hb-bio p {
    margin-bottom: 15px;
}

.mCC-hb-bio {
    margin-top: 15px;
    color: var(--txt1);
}

.mCC-headerBottom {
    margin-top: 6px !important;
    margin: 12px;
}

.mCC-hT-left {
    flex-grow: 3;
}

.mCC-hT-right {
    margin-top: 55px;
}

.mCC-button.bell {
    padding: 5px 7px 5px 7px;
}

.mCC-button {
    background-color: var(--bg3);
    border: 2px solid var(--bg3);
    border-radius: 7px;

    color: var(--txt1);
    font-size: 16px;

    padding: 5px 10px 5px 10px;
    margin-right: 5px;
}

.mCC-headerTop {
    display: flex;
    margin-top: -50px;
}

.mCC-accountPicture {
    height: 80px;
    width: 80px;

    border: 3px solid var(--bg2);
    border-radius: 10px;

    margin-left: 12px;

    background-color: var(--bg2);
}

.mCC-accountDisplayName {
    color: var(--txt1);
    font-size: 18px;
}

.mCC-accountUserName {
    color: var(--txt2);
    font-size: 16px;
}

.mCC-accountHeaderContainer {
    height: 150px;
    border: none;

    background-color: var(--bg3);
}

.mCC-accountHeader {
    height: 100%;
    width: 100%;
    object-fit: cover;

    border: none;
}

.mCC-stats .stat {
    width: 100%;
}
</style>