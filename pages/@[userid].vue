<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        token: "",
        instanceurl: "",
        acct: "",
        selfid: "",
        user: {},
        relationships: {}
    }),
    mounted() {
        this.selfid = this.getLocalStorage("user_id")
        this.instanceurl = this.getLocalStorage("instanceurl")
        this.token = this.getLocalStorage("token")
        this.acct = this.$route.params.userid

        this.getOtherUserDetails()
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

            const getrelationships = await fetch("https://" + this.instanceurl + "/api/v1/accounts/relationships/?id=" + this.user.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            const getrelationships_response = await getrelationships.json()

            this.relationships = getrelationships_response[0]

            console.log(getrelationships_response[0])
        }
    }
}

</script>

<template>
    <div class="mColumnHeader">
        <p>{{ user.display_name }}</p>
    </div>
    <div class="mColumnContent">
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
                        <button class="mCC-button edit" v-if="user.id === selfid">Edit Profile</button>
                        <button class="mCC-button follow"
                            v-if="user.id !== selfid && !this.relationships.following">Follow</button>
                        <button class="mCC-button unfollow"
                            v-if="user.id !== selfid && this.relationships.following">Unfollow</button>
                        <button class="mCC-button bell" v-if="user.id !== selfid">
                            <Icon type="bell" size="20px" />
                        </button>
                    </div>
                </div>
                <div class="mCC-headerBottom">
                    <p class="mCC-accountDisplayName">{{ this.user.display_name }}</p>
                    <p class="mCC-accountUserName">@{{ this.user.acct }}</p>
                    <div class="mCC-followsYouContainer" v-if="relationships.followed_by">
                        <span class="mCC-followsYou" v-if="!relationships.following">
                            Follows You
                        </span>
                        <span class="mCC-followsYou mutuals" v-if="relationships.following">
                            Mutuals
                        </span>
                    </div>
                    <div class="mCC-hb-bio">
                        <p v-html="user.note"></p>
                    </div>
                    <div class="mCC-hb-fields">
                        <div class="mCC-hb-field" v-for="field in user.fields">
                            <span class="mCC-hb-fieldName" v-html="field.name"></span>
                            <span class="mCC-hb-fieldValue" v-html="field.value"></span>
                        </div>
                    </div>
                    <div class="mCC-stats">
                        <div class="stat">
                            {{ user.statuses_count }} posts
                        </div>
                        <div class="stat">
                            {{ user.following_count }} following
                        </div>
                        <div class="stat">
                            {{ user.followers_count }} followers
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            
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
    border-color: var(--accent1);
    background-color: var(--accent1);
}

.mCC-button.follow:hover {
    border-color: var(--accent1);
    background-color: var(--accent1);
}

.mCC-button.unfollow:hover {
    border-color: var(--bg-danger);
    background-color: var(--bg-danger);
}


.mCC-hb-field:last-child {
    margin-bottom: 0px;
}

.mCC-hb-field {
    margin-bottom: 2px;
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
}</style>