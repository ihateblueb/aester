<script setup>
import Post from '../components/Post.vue'
import Icon from '../components/Icon.vue'
</script>

<script>
export default {
    data: () => ({
        ready: false,
        token: '',
        instanceurl: '',
        tootid: '',
        toot: {},
    }),
    mounted() {
        this.selfid = this.getLocalStorage('user_id')
        this.instanceurl = this.getLocalStorage('instanceurl')
        this.token = this.getLocalStorage('token')
        this.tootid = this.$route.params.tootid

        this.getTootDetails()

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
                return localStorage.getItem(key)
            }
        },
        removeLocalStorage(key) {
            if (process.client) {
                return localStorage.removeItem(key)
            }
        },

        async getTootDetails() {
            const gettootdetails = await fetch(
                'https://' +
                    this.instanceurl +
                    '/api/v1/statuses/' +
                    this.tootid,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            const gettootdetails_response = await gettootdetails.json()

            this.toot = gettootdetails_response

            console.log(gettootdetails_response)
        },
    },
}
</script>

<template>
    <div class="mColumnHeader">
        <div class="mCH-left">
            <div class="mCH-text">
                <p>Toot</p>
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
        {{ toot }}
    </div>
</template>
