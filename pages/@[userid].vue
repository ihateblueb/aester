<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        token: "",
        instanceurl: "",
        acct: "",
        user: {}
    }),
    mounted() {
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
            // https://docs.joinmastodon.org/methods/accounts/#lookup
            const getotheruserdetails = await fetch("https://" + this.instanceurl + "/api/v1/accounts/lookup/?acct=" + this.acct, {
                method: "GET"
            })
            const getotheruserdetails_response = await getotheruserdetails.json()

            this.user = getotheruserdetails_response

            console.log(getotheruserdetails_response)
        }
    }
}

</script>

<template>
    <div class="mColumnHeader">
        <p>{{ user.display_name }}</p>
    </div>
    <div class="mColumnContent">
        <div>
            <div class="mCC-accountHeaderContainer">
                <img class="mCC-accountHeader" :src="this.user.header">
            </div>
            <div>
                <div class="mCC-headerTop">
                    <div class="mCC-hT-left">
                        <img class="mCC-accountPicture" :src="this.user.avatar">
                    </div>
                    <div class="mCC-hT-right">
                        <button class="mCC-button">Follow</button>
                        <button class="mCC-button bell">
                            <Icon type="bell" size="20px" />
                        </button>
                    </div>
                </div>
                <div class="mCC-headerBottom">
                    <p class="mCC-accountDisplayName">{{ this.user.display_name }}</p>
                    <p class="mCC-accountUserName">@{{ this.user.acct }}</p>
                    <div class="mCC-hb-bio">
                        <p v-html="user.note"></p>
                    </div>
                    <div class="mCC-hb-fields">
                        <div class="mCC-hb-field" v-for="field in user.fields">
                            <span class="mCC-hb-fieldName" v-html="field.name"></span>
                            <span class="mCC-hb-fieldValue" v-html="field.value"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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
    margin-top: 6px!important;
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
</style>