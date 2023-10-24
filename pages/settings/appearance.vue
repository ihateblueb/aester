<script setup>
import ColorSwatches from '../../components/ColorSwatches.vue'
import themes from 'assets/themes.json'
</script>

<script>
definePageMeta({
    layout: 'settings',
})

export default {
    data: () => ({
        ready: false,
        colortheme: '',
        extraanimations: false,
    }),
    mounted() {
        this.colortheme = this.getLocalStorage('ui_colortheme')
        this.extraanimations = this.getLocalStorage('ui_extraanimations')
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

        async colorThemeAction(action, theme) {
            if (action === 'set') {
                this.setLocalStorage('ui_colortheme', theme)
                this.setColorTheme()
            }
        },

        setColorTheme() {
            this.colortheme = this.getLocalStorage('ui_colortheme')

            // remove previous
            let themearray = Object.entries(
                JSON.parse(JSON.stringify(themes.color))
            )

            themearray.forEach((element) => {
                document.body.classList.remove('cs_' + element[1].id)
            })

            document.body.classList.add(this.colortheme)
        },

        extraAnimationToggle() {
            this.extraanimations = this.getLocalStorage('ui_extraanimations')
            if (this.extraanimations === 'true') {
                document.body.classList.remove("extra-animations")
                this.setLocalStorage('ui_extraanimations', 'false')
                this.extraanimations = 'false'
            } else {
                document.body.classList.add("extra-animations")
                this.setLocalStorage('ui_extraanimations', 'true')
                this.extraanimations = 'true'
            }
        }
    },
}
</script>

<template>
    <div class="settingsPage">
        <h2>Appearance</h2>
        <div class="settingContainer">
            <h3>Base Theme</h3>
        </div>
        <div class="settingContainer">
            <h3>Color Theme</h3>
            <div>
                <div class="ctheme" v-for="theme in themes.color">
                    <input type="radio" :id="'cs_' + theme.id" name="cs" :value="'cs_' + theme.id"
                        @click="colorThemeAction('set', 'cs_' + theme.id)" :checked="colortheme === 'cs_' + theme.id" />
                    <label :for="'cs_' + theme.id">{{ theme.name }}
                        <div class="cthemeTags">
                            <span class="cthemeTag" v-for="tag in theme.tags">{{
                                tag
                            }}</span>
                        </div>
                    </label>
                    <ColorSwatches :theme="'cs_' + theme.id" />
                </div>
            </div>
            <p class="attribution">
            <p>
                Catppuccin color themes are open source
                <a href="https://github.com/catppuccin/catppuccin#-palette">on GitHub</a>.
            </p>
            <p>
                Rosé Pine color themes are also available
                <a href="https://rosepinetheme.com/palette/">from their website</a>.
            </p>
            <p style="margin-top: 5px">
                Some colors have been modified to better fit the UI.
            </p>

            </p>
        </div>
        <div class="settingContainer">
            <h3>Extras</h3>
            <div>
                <div>
                    <input type="checkbox" id="extraanimations" name="extraanimations" value="extraanimations" @click="extraAnimationToggle" :checked="extraanimations === true" />
                    <label for="extraanimations"> Enable extra animations in UI</label>
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

.attribution a {
    text-decoration: underline;
}

.ctheme {
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
