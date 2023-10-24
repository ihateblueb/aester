<script>
definePageMeta({
    layout: 'settings',
})

export default {
    data: () => ({
        ready: false,
        colortheme: '',
    }),
    mounted() {
        this.colortheme = this.getLocalStorage('ui_colortheme')
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
    },
}
</script>

<template>
    <div class="settingsPage">
        <h2>Accessibility</h2>
        <div class="settingContainer">
            <div>
                <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1"> Enable reduced motion</label>
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
