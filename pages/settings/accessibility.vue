<script setup>
import Checkbox from "../../components/Checkbox.vue";
</script>

<script>
definePageMeta({
    layout: "settings",
});

export default {
    data: () => ({
        ready: false,
        reducedmotion: "false",
    }),
    mounted() {
        this.reducedmotion = this.getLocalStorage("ui_reducedmotion");
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

        reducedMotionToggle() {
            this.reducedmotion = this.getLocalStorage("ui_reducedmotion");
            if (this.reducedmotion === "true") {
                document.body.classList.remove("reduced-motion");
                this.setLocalStorage("ui_reducedmotion", "false");
                this.reducedmotion = "false";
            } else {
                document.body.classList.add("reduced-motion");
                this.setLocalStorage("ui_reducedmotion", "true");
                this.reducedmotion = "true";
            }
        },
    },
};
</script>

<template>
    <div class="settingsPage" v-if="ready">
        <h2>Accessibility</h2>
        <div class="settingContainer">
            <div>
                <div class="checkboxSetting" @click="reducedMotionToggle">
                    <div>
                        <Checkbox :checked="reducedmotion" :key="reducedmotion" />
                        <label for="extraanimations">
                            Enable reduced motion</label>
                    </div>
                    <p class="settingExplaination">
                        Reduced motion will disable animations throughout the
                        UI.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.cthemeTag:first-child {
    margin-left: 5px;
}

.cthemeTag {
    color: var(--txt2);
    background-color: var(--bg3);
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 100px;
    margin-right: 5px;
}

.cthemeTags {
    display: inline-flex;
}

.attribution {
    margin-top: 15px;

    color: var(--txt2);
    font-size: 14px;
}

.settingExplaination {
    margin-top: 5px;

    color: var(--txt2);
    font-size: 14px;
}

.attribution a {
    text-decoration: underline;
}

.ctheme,
.checkboxSetting {
    margin-top: 10px;
}

.themePreview {
    display: flex;
}

.themePreviewSwatch {
    height: 18px;
    width: 18px;

    margin-top: 5px;
    margin-bottom: 5px;

    border-radius: 5px;
    border: 1px solid #ffffff25;
    margin-right: 5px;
}

.settingsPage .settingContainer {
    margin-top: 15px;
}

.settingsPage {
    margin: 20px;
    margin-top: 30px;
    color: var(--txt1);
}

.settingsPage h2 {
    margin-bottom: 20px;
}
</style>
