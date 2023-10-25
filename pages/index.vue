<script setup>
import Icon from "../components/Icon.vue";
</script>

<script>
export default {
    data: () => ({
        instanceurl: "",
        instance: {},
    }),
    mounted() {
        this.instanceurl = this.getLocalStorage("instanceurl");

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
        },
    },
};
</script>

<template>
    <div class="mColumnHeader">
        <div class="mCH-left">
            <div class="mCH-text">
                <p>Get Started</p>
            </div>
        </div>
        <div class="mCH-buttons">
            <NuxtLink to="/about" class="btn btn-header">
                <Icon name="info" size="16px" />
            </NuxtLink>
        </div>
    </div>
    <div class="mColumnContent">
        <div class="getstartedLinks">
            <NuxtLink to="local" class="getstartedLink">
                <Icon type="home" size="18px" />
                <span>Local Timeline</span>
            </NuxtLink>
            <NuxtLink to="federated" class="getstartedLink">
                <Icon type="globe" size="18px" />
                <span>Federated Timeline</span>
            </NuxtLink>
            <NuxtLink to="explore" class="getstartedLink">
                <Icon type="trending-up" size="18px" />
                <span>Trending</span>
            </NuxtLink>
            <NuxtLink to="followrequests" class="getstartedLink">
                <Icon type="user-plus" size="18px" />
                <span>Follow Requests</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style>
.getstartedLink span {
    margin-left: 10px;
}

.getstartedLink .feathericon {
    margin-bottom: 0px;
}

.getstartedLink:hover {
    background-color: var(--bg3);
    color: var(--txt1);
}

.getstartedLink:first-child {
    margin-top: 10px;
}

.getstartedLink {
    display: flex;
    align-items: center;

    color: var(--txt2);
    margin: 5px 10px 5px 10px;
    padding: 12px;
    border-radius: 7px;
}

.getstartedLinks {
    display: flex;
    flex-direction: column;
}</style>
