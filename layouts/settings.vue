<script>
export default {
    data: () => ({
        href: ""
    }),
    mounted() {
        const route = useRoute()
        this.href = route.href
    }
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
                    Appearance
                </NuxtLink>
            </div>

            <div class="sidebarCategory">
                <NuxtLink to="/settings/account" class="sidebarCategoryItem">
                    Account
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