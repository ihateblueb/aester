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
        this.getInstance()

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
                <p>About</p>
            </div>
        </div>
        <div class="mCH-buttons">
            <NuxtLink to="/" class="btn btn-header">
                <Icon name="home" size="16px" />
            </NuxtLink>
        </div>
    </div>
    <div class="mColumnContent">
        <div class="aboutContent">
            <h3>{{ instance.title }} <p class="aboutVersion">{{ instance.version }}</p>
            </h3>
            <div class="aboutInnerContent">
                <p class="aIC-description">{{ instance.description }}</p>
            </div>
            <div class="rules">
                <h3>Instance Rules</h3>
                <div class="rule" v-for="rule in instance.rules">
                    <span class="ruleID">#{{ rule.id }}</span> {{ rule.text }}
                </div>
            </div>
            <div class="contact">
                <h3>Contact</h3>
                <!--

                <div class="contactInfo">
                    <p>Admin Email <span>{{ instance.contact.email }}</span></p>

                    <p>Admin Account <span><NuxtLink :to="'/@'+instance.contact.account.acct">@{{ instance.contact.account.acct }}</NuxtLink></span></p>
                </div>

                -->
            </div>
        </div>
        <div class="aboutContent">
            <h3>Aster <p class="aboutVersion"></p>
            </h3>
            <div class="aboutInnerContent">
                <p>Made by blueb</p>
            </div>
        </div>
    </div>
</template>

<style>
.contactInfo p span {
    color: var(--txt1);
}

.contactInfo p {
    color: var(--txt2);
}

.contactInfo p:first-child {
    margin-bottom: 15px;
}

.contactInfo {
    margin-top: 15px;
}

.contact h3 {
    margin-top: 15px;
}

.rules h3 {
    margin-top: 15px;
}

.ruleID {
    color: var(--txt2);
}

.rule {
    border-radius: 7px;
    padding: 10px 15px 10px 15px;
    margin-top: 15px;

    background-color: var(--bg3);
}

.aboutContent {
    padding: 15px;
    color: var(--txt1);
}

.aboutVersion {
    font-weight: 500;
    font-size: 16px;
    color: var(--txt2);
}

.aboutInnerContent {
    color: var(--txt2);
}

.aIC-description {
    margin-top: 15px;
    color: var(--txt1);
}</style>