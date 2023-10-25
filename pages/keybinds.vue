<script setup>
import Icon from "../components/Icon.vue";
</script>

<script>
export default {
    data: () => ({
        ready: false,
        instanceurl: "",
        instance: {},
    }),
    mounted() {
        this.instanceurl = this.getLocalStorage("instanceurl");
        this.getInstance();
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

        async getInstance() {
            const getinstance = await fetch(
                "https://" + this.instanceurl + "/api/v2/instance",
                {
                    method: "GET",
                }
            );
            const getinstance_response = await getinstance.json();

            this.instance = getinstance_response;

            console.log(getinstance_response);

            this.ready = true;
        },
    },
};
</script>

<template>
    <div class="mColumnHeader">
        <div class="mCH-left">
            <div class="mCH-text">
                <p>Keybinds</p>
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
        <div>
            <code>CTRL + ,</code>
            <span>Open Settings page</span>
        </div>
        <!--
        <div>
            <code>L</code>
            <span>Open local timeline</span>
        </div>
        <div>
            <code>F</code>
            <span>Open federated timeline</span>
        </div>
        -->
    </div>
</template>

<style>
</style>
