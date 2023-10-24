<script setup>
import themes from 'assets/themes.json'
</script>

<script>
export default {
    data: () => ({
        href: '',
    }),
    mounted() {
        this.loadSettings()
        const route = useRoute()
        this.href = route.href
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

        async loadSettings() {
            // color themes
            this.colortheme = this.getLocalStorage('ui_colortheme')
            let themearray = Object.entries(
                JSON.parse(JSON.stringify(themes.color))
            )
            themearray.forEach((element) => {
                document.body.classList.remove('cs_' + element[1].id)
            })
            document.body.classList.add(this.colortheme)

            // reduced motion
            this.reducedmotion = this.getLocalStorage('ui_reducedmotion')
            document.body.classList.remove('reduced-motion')
            if (this.reducedmotion === 'true') {
                document.body.classList.add('reduced-motion')
            }

            // extra animations
            this.extraanimations = this.getLocalStorage('ui_extraanimations')
            document.body.classList.remove('extra-animations')
            if (this.extraanimations === 'true') {
                document.body.classList.add('extra-animations')
            }
        },
    },
}
</script>

<template>
    <div class="settings">
        <div class="settingsSidebar">
            <div class="returnCtn">
                <NuxtLink to="/" class="return sidebarItem">
                    <Icon type="chevron-left" size="18px" />
                    <span>Return to Aster</span>
                </NuxtLink>
            </div>

            <div class="sidebarCategory">
                <NuxtLink to="/settings" class="sidebarCategoryItem">
                    General
                </NuxtLink>
                <NuxtLink to="/settings/appearance" class="sidebarCategoryItem">
                    Appearence
                </NuxtLink>
                <NuxtLink
                    to="/settings/accessibility"
                    class="sidebarCategoryItem"
                >
                    Accessibility
                </NuxtLink>
            </div>

            <div class="sidebarCategory">
                <NuxtLink to="/settings/profile" class="sidebarCategoryItem">
                    Profile
                </NuxtLink>
            </div>

            <div class="sidebarCategory">
                <NuxtLink to="/settings/debug" class="sidebarCategoryItem">
                    Debug
                </NuxtLink>
                <NuxtLink
                    to="/settings/experiments"
                    class="sidebarCategoryItem"
                >
                    Experiments
                </NuxtLink>
            </div>
        </div>
        <div class="settingsMain">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.sidebarCategoryItem.router-link-exact-active {
    background-color: var(--bg3);
    border: 1px solid var(--bg3);
    color: var(--txt1);
}

.sidebarCategoryItem:first-child {
    margin-top: 15px;
    border-radius: 7px;
}

.sidebarCategoryItem:hover {
    background-color: var(--bg3-50);
    border: 1px solid var(--bg4-50);
}

.sidebarCategoryItem {
    margin: 2px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 15px 10px 15px;
    color: var(--txt2);
    border-radius: 7px;
    border: 1px solid var(--bg2);
}

.sidebarCategory {
    display: flex;
    flex-direction: column;
}

.sidebarItem {
    padding: 10px;
}

.return {
    color: var(--txt1);
    font-size: 16px;
    display: flex;
    align-items: center;
    max-height: 46px;
}

.returnCtn {
    height: 45px !important;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bg1);
}

.return .feathericon {
    margin-bottom: 0px;
}

.settings {
    display: flex;
}

.settingsSidebar {
    background-color: var(--bg2);
    border-right: 1px solid var(--bg1);
    width: 350px;
    height: 100vh;
    box-sizing: border-box;
}

.settingsMain {
    background-color: var(--bg2);
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
}
</style>
