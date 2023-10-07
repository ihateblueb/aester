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
        user: {},
        users: []
    }),
    mounted() {
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

            this.loadFollowers()
        },

        async loadFollowers() {
            let initialfollowers = await fetch("https://" + this.instanceurl + "/api/v1/accounts/" + this.user.id + "/following", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let initialfollowers_response = await initialfollowers.json()

            initialfollowers_response.forEach((element) =>
                this.users.push(element) &&
                console.log(element)
            )
        }
    }
}

</script>

<template>
    <div class="mColumnHeader" v-if="ready === true">
        <div class="mCH-left">
            <NuxtLink :to="'/@' + user.acct">
                <Icon type="chevron-left" size="18" />
            </NuxtLink>
            <div class="mCH-text">
                Following
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
    <div class="mColumnContent" v-if="ready">
        <div class="mCC-userContent">
            <div class="userList">
                <div class="userList-item" v-for="user in users">
                    <div class="userList-userTop">
                        <img class="userList-avatar" :src="user.avatar">
                        <div class="userList-names">
                            <NuxtLink :to="'/@'+user.acct">
                                <p class="displayname">{{ user.display_name }}</p>
                                <p class="username">@{{ user.acct }}</p>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.userList-item {
    margin: 12px;
}

.userList-userBottom {
    margin-top: 10px;
    color: var(--txt1);
}

.userList .displayname {
    color: var(--txt1);
}

.userList .username {
    color: var(--txt2);
    font-size: 14px;
}

.userList-userTop {
    display: flex;
    align-content: center;
    align-items: center;
}

.userList-names {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.userList-avatar {
    height: 45px;
    width: 45px;
    border-radius: 7px;
    margin-right: 10px;
}
</style>