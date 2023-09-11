<script setup>
import Icon from '../components/Icon.vue';
</script>

<script>
export default {
    data: () => ({
        content: [],
        ready: false,
        showCwContent: false
    }),
    props: {
        instanceurl: String,
        token: String,
        data: Object,
    },
    mounted() {
        this.content = this.data
        this.ready = true
    },
    methods: {
        
    }
}
</script>

<template>
    <div class="post" v-if="this.ready">
        <div v-if="this.content.type === 'favourite'">
            <div class="notificationTop">
                <Icon type="star" size="18px" color="var(--favorite)" fill=true />
                <span>{{ content.account.display_name }} favorited your post</span>
            </div>
        </div>
        <div v-if="this.content.type === 'reblog'">
            <div class="notificationTop">
                <Icon type="repeat" size="18px" color="var(--reblog)" />
                <span>{{ content.account.display_name }} favorited your post</span>
            </div>
        </div>
        <div v-if="this.content.type === 'follow'">
            <div class="notificationTop">
                <Icon type="user-plus" size="18px" color="var(--accent1)" />
                <span>{{ content.account.display_name }} followed you</span>
            </div>
        </div>
        <div v-if="this.content.type === 'mention'">
            <div class="notificationTop">
                <Icon type="at-sign" size="18px" color="var(--accent1)" />
                <span>{{ content.account.display_name }} mentioned you</span>
            </div>
            <div class="notificationStatus">
                <p>"</p>
                <span v-html="content.status.content"></span>
                <p>"</p>
            </div>
        </div>
        <div v-if="this.content.type !== 'reblog' && this.content.type !== 'favourite' && this.content.type !== 'follow' && this.content.type !== 'mention'">
            <div class="notificationTop">
                <Icon type="alert-circle" size="18px" color="var(--bg-danger)" />
                <span>{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<style>
.notificationTop {
    font-size: 16px;
}

.notificationTop span {
    padding-left: 10px;
}

.notificationTop .vue-feather {
    min-width: 18px;
}
</style>