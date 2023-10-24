<script>
definePageMeta({
    layout: "settings",
});

export default {
    data: () => ({
        ready: false,
        token: "",
        instanceurl: "",
        selfid: 0,
        user: {},
        editor: {
            bio: "",
        },
    }),
    mounted() {
        this.selfid = this.getLocalStorage("user_id");
        this.instanceurl = this.getLocalStorage("instanceurl");
        this.token = this.getLocalStorage("token");

        this.getUserDetails();

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

        async getUserDetails() {
            const getotheruserdetails = await fetch(
                "https://" +
                    this.instanceurl +
                    "/api/v1/accounts/" +
                    this.selfid,
                {
                    method: "GET",
                }
            );
            const getotheruserdetails_response =
                await getotheruserdetails.json();

            this.user = getotheruserdetails_response;
            this.editor.bio = this.user.note;

            console.log(getotheruserdetails_response);
        },

        async biovalidate(event) {
            this.editor.bio = event.target.innerHTML;
            console.log(this.editor.bio);
        },
    },
};
</script>

<template>
    <div class="settingsPage" v-if="ready">
        <h2>Profile</h2>
        <div>
            <div>
                <p class="avatarLabel">Banner</p>
                <div class="avatarArea">
                    <img class="banner" :src="user.header" alt="Your banner" />
                    <div class="avatarActions">
                        <button>Remove</button>
                        <button>Upload</button>
                    </div>
                </div>
            </div>
            <div>
                <p class="avatarLabel">Avatar</p>
                <div class="avatarArea">
                    <img class="avatar" :src="user.avatar" alt="Your avatar" />
                    <div class="avatarActions">
                        <button>Remove</button>
                        <button>Upload</button>
                    </div>
                </div>
                <div class="names">
                    <p>Display Name</p>
                    <input
                        :placeholder="user.display_name"
                        :value="user.display_name"
                    />
                    <p>Username</p>
                    <input :placeholder="user.acct" :value="user.acct" />
                </div>
            </div>
        </div>
        <div class="bio">
            <p class="label">Bio</p>
            <p
                class="bioEditor"
                v-html="editor.bio"
                @keyup="biovalidate"
                contenteditable="true"
            ></p>
        </div>
        <div>
            <!-- fields -->
        </div>
        <div>
            <br />
            <button class="submitButton">Apply Changes</button>
        </div>
    </div>
</template>

<style>
.submitButton {
    color: var(--txt1);
    background-color: var(--bg3) !important;
    border: 2px solid var(--bg3) !important;

    border-radius: 7px;
    padding: 6px;
    padding-right: 6px;
    padding-left: 6px;
    margin-top: 10px;
}

.banner {
    height: 125px;
    border-radius: 10px;
}

.bioEditor {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    overflow-y: scroll;
    resize: vertical;
    color: var(--txt1);

    max-width: 520px !important;
}

.bioEditor p:not(:last-child) {
    margin-bottom: 15px;
}

.settingsPage .avatarLabel {
    margin-top: 15px;
    margin-bottom: 5px;
    color: var(--txt2);
    font-size: 14px;
}

.settingsPage .names p,
.settingsPage .bio p.label {
    margin-top: 15px;
    margin-bottom: -10px;
    color: var(--txt2);
    font-size: 14px;
}

.settingsPage .names input:focus {
    outline: none;
}

.settingsPage .names input {
    border: none;
    margin-top: 15px;
    background-color: var(--bg3);
    padding: 10px;
    border-radius: 7px;
    color: var(--txt1);
    font-size: 16px;

    max-width: 500px;
}

.settingsPage .names {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}

.avatarArea {
    display: flex;
    align-items: center;
}

.avatarActions button {
    margin-top: 5px;
    margin-bottom: 5px;

    background-color: var(--bg3);

    border: 2px solid var(--bg3);
    border-radius: 7px;

    padding: 6px;

    color: var(--txt1);
    font-family: var(--font1);

    min-width: 80px;
}

.avatarActions {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}

.settingsPage .bioEditor:focus {
    outline: none;
}

.settingsPage .bioEditor {
    margin-top: 15px;
    background-color: var(--bg3);
    padding: 10px;
    border-radius: 7px;
    resize: vertical;
    font-size: 16px;

    max-width: 500px;
}

.settingsPage .avatar {
    height: 85px;
    border-radius: 10px;
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
