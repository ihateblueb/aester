<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        instanceurl: "",
        instance: {}
    }),
    mounted() {
        this.instanceurl = this.getLocalStorage("instanceurl")

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

        async getInstance() {
            const getinstance = await fetch("https://" + this.instanceurl + "/api/v2/instance", {
                method: "GET"
            })
            const getinstance_response = await getinstance.json()

            this.instance = getinstance_response

            console.log(getinstance_response)
        },
    }
}
</script>

<template>
    <div class="mColumnHeader">
        <div class="mCH-left">
            <div class="mCH-text">
                <p class="noSelection">No Selection...</p>
            </div>
        </div>
        <div class="mCH-buttons">
            <NuxtLink to="/about" class="btn btn-header">
                <Icon name="info" size="16px" />
            </NuxtLink>
        </div>
    </div>
</template>

<style></style>