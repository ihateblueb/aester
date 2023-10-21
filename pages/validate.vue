<script>
definePageMeta({
    layout: 'validate',
})

export default {
    data: () => ({
        code: '',
    }),
    mounted() {
        console.log(this.$route)

        if (this.$route.query.code) {
            this.code = this.$route.query.code
            this.setLocalStorage('validator_code', this.code)
            window.open('/?continueAuth=true','_self')
        } else {
            window.open('/','_self')
        }
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
    },
}
</script>

<template>
    <div class="validateCtn">
        <h1 class="validateText">Validating...</h1>
        <Icon class="spin" type="settings" color="var(--txt2)" size="24" />
    </div>
</template>

<style>
.validateCtn {
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: center;
    color: var(--txt1);
}

@keyframes spin {
    0% {
        rotate: 0deg;
    }
    100% {
        rotate: 360deg;
    }
}

.spin {
    margin-top: 20px;

    animation-name: spin;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
}
</style>
