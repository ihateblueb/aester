<script>
definePageMeta({
    layout: "settings",
});
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
                    <input type="radio" id="cs_purpura" name="cs"
                        value="cs_purpura">
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
                    <input type="radio" id="cs_catppuccin-latte" name="cs"
                        value="cs_catppuccin-latte">
                    <label for="cs_catppuccin-latte"> Catppuccin Latte</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-danger);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-warning);"></div>
                        <div class="cs_catppuccin-latte themePreviewSwatch" style="background-color: var(--bg-success);"></div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-frappe" name="cs"
                        value="cs_catppuccin-frappe">
                    <label for="cs_catppuccin-frappe"> Catppuccin Frappe</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-danger);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-warning);"></div>
                        <div class="cs_catppuccin-frappe themePreviewSwatch" style="background-color: var(--bg-success);"></div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-macchiato" name="cs"
                        value="cs_catppuccin-macchiato">
                    <label for="cs_catppuccin-macchiato"> Catppuccin Macchiato</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg-danger);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg-warning);"></div>
                        <div class="cs_catppuccin-macchiato themePreviewSwatch" style="background-color: var(--bg-success);"></div>
                    </div>
                </div>
                <div class="ctheme">
                    <input type="radio" id="cs_catppuccin-mocha" name="cs"
                        value="cs_catppuccin-mocha">
                    <label for="cs_catppuccin-mocha"> Catppuccin Mocha</label>
                    <div class="themePreview">
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg2);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg3);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg4);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--txt1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--txt2);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--accent1);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-danger);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-warning);"></div>
                        <div class="cs_catppuccin-mocha themePreviewSwatch" style="background-color: var(--bg-success);"></div>
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
}
</style>