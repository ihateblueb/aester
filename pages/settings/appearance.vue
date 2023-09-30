<script>
definePageMeta({
    layout: "settings",
});

export default {
    data: () => ({
        ready: false,
        colortheme: "",
    }),
    mounted() {
        this.colortheme = this.getLocalStorage("ui_colortheme")
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

        async colorThemeAction(action, theme) {
            if (action === "set") {
                this.setLocalStorage("ui_colortheme", theme)
                this.setColorTheme()
            }
        },

        async setColorTheme() {
            this.colortheme = this.getLocalStorage("ui_colortheme")

            // remove previous
            document.body.classList.remove("cs_purpura")
            document.body.classList.remove("cs_catppuccin-latte")
            document.body.classList.remove("cs_catppuccin-frappe")
            document.body.classList.remove("cs_catppuccin-macchiato")
            document.body.classList.remove("cs_catppuccin-mocha")

            document.body.classList.add(this.colortheme)
        },
    }
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
                <div class="ctheme">
                    <input type="radio" id="cs_purpura" name="cs" value="cs_purpura"
                        @input="this.colortheme === 'cs_purpura'" @click="colorThemeAction('set', 'cs_purpura')">
                    <label for="cs_purpura"> Purpura (default)</label>
                    <div class="themePreview">
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg-danger);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg-warning);"></div>
                        <div class="cs_purpura themePreviewSwatch" style="background-color: var(--bg-success);"></div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-latte" name="cs" value="cs_catppuccin-latte"
                        @input="this.colortheme === 'cs_catppuccin-latte'"
                        @click="colorThemeAction('set', 'cs_catppuccin-latte')">
                    <label for="cs_catppuccin-latte"> Catppuccin Latte</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-danger);">
                        </div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-warning);">
                        </div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-success);">
                        </div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-frappe" name="cs" value="cs_catppuccin-frappe"
                        @input="this.colortheme === 'cs_catppuccin-frappe'"
                        @click="colorThemeAction('set', 'cs_catppuccin-frappe')">
                    <label for="cs_catppuccin-frappe"> Catppuccin Frappe</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--accent1);">
                        </div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-danger);">
                        </div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-warning);">
                        </div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-success);">
                        </div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-macchiato" name="cs" value="cs_catppuccin-macchiato"
                        @input="this.colortheme === 'cs_catppuccin-macchiato'"
                        @click="colorThemeAction('set', 'cs_catppuccin-macchiato')">
                    <label for="cs_catppuccin-macchiato"> Catppuccin Macchiato</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--txt1);">
                        </div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--txt2);">
                        </div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--accent1);">
                        </div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg-danger);">
                        </div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch"
                            style="background-color: var(--bg-warning);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch"
                            style="background-color: var(--bg-success);"></div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-mocha" name="cs" value="cs_catppuccin-mocha"
                        @input="this.colortheme === 'cs_catppuccin-mocha'"
                        @click="colorThemeAction('set', 'cs_catppuccin-mocha')">
                    <label for="cs_catppuccin-mocha"> Catppuccin Mocha</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-danger);">
                        </div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-warning);">
                        </div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-success);">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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