<script setup>
import ColorSwatches from '../../components/ColorSwatches.vue'
import FontSample from '../../components/FontSample.vue'
import Checkbox from '../../components/Checkbox.vue'
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
        extraanimations: 'false',
        fonttheme: 'inter',
    }),
    mounted() {
        this.colortheme = this.getLocalStorage('ui_colortheme')
        this.extraanimations = this.getLocalStorage('ui_extraanimations')
        this.fonttheme = this.getLocalStorage('ui_font')
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

        async fontAction(action, font) {
            if (action === 'set') {
                this.setLocalStorage('ui_font', font)
                this.setFont()
            }
        },

        setFont() {
            this.fonttheme = this.getLocalStorage('ui_font')

            // remove previous
            let fontarray = Object.entries(
                JSON.parse(JSON.stringify(themes.font))
            )

            fontarray.forEach((element) => {
                document.body.classList.remove('ft_' + element[1].id)
            })

            document.body.classList.add(this.fonttheme)
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
    <div class="settingsPage" v-if="ready">
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
            <h3>Fonts</h3>
            <div>
                <div class="ftheme" v-for="font in themes.font">
                    <input type="radio" :id="'ft_' + font.id" name="ft" :value="'ft_' + font.id"
                        @click="fontAction('set', 'ft_' + font.id)" :checked="fonttheme === 'ft_' + font.id" />
                    <label :for="'ft_' + font.id">{{ font.name }}
                    </label>
                    <FontSample :font="font.id" />
                </div>
            </div>
        </div>
        <div class="settingContainer">
            <h3>Extras</h3>
            <div>
                <div class="checkboxSetting" @click="extraAnimationToggle">
                    <div>
                        <Checkbox :checked="extraanimations" :key="extraanimations" />
                        <label for="extraanimations"> Enable extra animations in UI</label>
                    </div>
                    <p class="settingExplaination">
                        Adds extra animations with emojis and buttons throughout the UI. If reduced motion is enabled, this
                        will do nothing.
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
.checkboxSetting,
.ftheme {
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
}</style>
