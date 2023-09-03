<script>
export default {
    data: () => ({
        code: "", // gets ignored after login
        loginstate: 'start',
        instanceurl: "",
        token: "",
        user: {
            displayname: "none",
            username: "none",
            avatar: "none",
        },
        app: {
            clientid: "",
            secret: "",
        },
        tootarea: ""
    }),
    mounted() {
        console.log("[Aster Startup] Login State: " + this.getLocalStorage("loginstate"))

        if (this.getLocalStorage("loginstate") === 'done') {
            this.loginstate = this.getLocalStorage("loginstate");
            this.afterLogin()
            this.getAccountDetails()
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
                return localStorage.getItem(key);
            }
        },
        removeLocalStorage(key) {
            if (process.client) {
                return localStorage.removeItem(key);
            }
        },

        async createApplication() {
            const gettingapp = await fetch("https://" + this.instanceurl + "/api/v1/apps", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `client_name=Aster for Web&redirect_uris=urn:ietf:wg:oauth:2.0:oob&scopes=read write push&website=https://as.blueb.me/`,
            })
            const gettingapp_response = await gettingapp.json()

            this.app.clientid = gettingapp_response.client_id;
            this.app.secret = gettingapp_response.client_secret;
            this.app.vapidkey = gettingapp_response.vapid_key;
            this.setLocalStorage("app_clientid", this.app.clientid)
            this.setLocalStorage("app_secret", this.app.secret)
            this.setLocalStorage("app_vapidkey", this.app.vapidkey)
        },

        async startlogin() {
            await this.createApplication()

            window.open("https://" + this.instanceurl + "/oauth/authorize?client_id=" + this.app.clientid + "&scope=read+write+push&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code", '_blank');
            this.loginstate = 'almost';
            this.setLocalStorage("instanceurl", this.instanceurl)
        },

        async endlogin() {

            const gettingtoken = await fetch("https://" + this.instanceurl + "/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `client_id=${this.app.clientid}&client_secret=${this.app.secret}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code&code=${this.code}&scope=read write push`,
            })
            const gettingtoken_response = await gettingtoken.json()

            this.setLocalStorage("token", gettingtoken_response.access_token)
            this.setLocalStorage("loginstate", "done")

            this.token = gettingtoken_response.access_token;
            this.loginstate = 'done';

            this.getAccountDetails()
            this.afterLogin()
        },

        async getAccountDetails() {
            const accountdetails = await fetch("https://" + this.instanceurl + "/api/v1/accounts/verify_credentials", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            const accountdetails_response = await accountdetails.json()

            this.user.avatar = accountdetails_response.avatar;
            this.user.displayname = accountdetails_response.display_name;
            this.user.username = accountdetails_response.username;
        },

        async afterLogin() {
            this.instanceurl = this.getLocalStorage("instanceurl");
            this.token = this.getLocalStorage("token");

            this.app.clientid = this.getLocalStorage("app_clientid");
            this.app.secret = this.getLocalStorage("app_secret");
            this.app.vapidkey = this.getLocalStorage("app_vapidkey");
        },

        async logout() {
            console.log("Logging out...")
            this.removeLocalStorage("token")
            this.removeLocalStorage("instanceurl")
            this.removeLocalStorage("loginstate")

            this.removeLocalStorage("app_clientid")
            this.removeLocalStorage("app_secret")
            this.removeLocalStorage("app_vapidkey")

            location.reload();
        },

        async sendToot() {
            console.log("[Aster Actions] Posting toot as @" + this.user.username + "@" + this.instanceurl + "...")

            const sendtoot = await fetch("https://" + this.instanceurl + "/api/v1/statuses", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `status=${this.tootarea}`,
            })
            const sendtoot_response = await sendtoot.json()

            console.log("[Aster Actions] Posted toot. Response below.")
            console.log(sendtoot_response)
        }
    }
}
</script>

<template>
    <div v-if="this.loginstate !== 'done'">
        <div class="loginArea" v-if="this.loginstate === 'start'">
            <div class="loginContainer">
                <div class="loginContainerHeader">
                    <h1 class="loginContainerHeading">Welcome to Aster</h1>
                </div>
                <div>
                    <p class="iptlabel">Please type your instances URL</p>
                    <input type="text" placeholder="eg. wetdry.world" class="ipt instanceTextArea" v-model="instanceurl">
                    <div class="instanceLoginButtons">
                        <button class="loginbtn" @click="startlogin()">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="loginArea" v-if="this.loginstate === 'almost'">
            <div class="loginContainer">
                <div class="loginContainerHeader">
                    <h1 class="loginContainerHeading">Welcome to Aster</h1>
                </div>
                <div>
                    <p class="iptlabel">Please type in your Authorization Code</p>
                    <input type="text" placeholder="Authorization Code" class="ipt instanceTextArea" v-model="code">
                    <div class="instanceLoginButtons">
                        <button class="loginbtn" @click="logout()">Cancel</button>
                        <button class="loginbtn" @click="endlogin()">Finish</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="this.loginstate === 'done'">
        <div class="mColumns">
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p>Aster <span class="betaTag">BETA</span></p>
                </div>
                <div class="postArea">
                    <div class="postAreaHeader">
                        <div class="postArea-avatars">
                            <img class="postArea-avatar" :src="user.avatar" :alt="user.displayname + 's avatar'">
                        </div>
                        <div class="postArea-names">
                            <p class="postArea-displayName">{{ user.displayname }}</p>
                            <p class="postArea-userName">@{{ user.username }}@{{ instanceurl }}</p>
                        </div>
                    </div>
                    <div>
                        <textarea class="postArea-textArea" placeholder="What's up?" v-model="tootarea"></textarea>
                        <div>
                            <button class="btn">📎</button>
                            <button class="btn">📦</button>
                            <select id="visiblity" class="postArea-visibility">
                                <option value="global">🌐 Global</option>
                                <option value="unlisted">🔓 Unlisted</option>
                                <option value="followers">🔐 Followers only</option>
                                <option value="mentioned">📧 Mentioned people only</option>
                            </select>
                            <button class="btn">CW</button>
                            <button class="btn">EN</button>
                            <button class="btn" @click="sendToot()">Toot</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p>Home</p>
                </div>
                e
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p>Notifications</p>
                </div>
                e
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p class="noSelection">No Selection...</p>
                </div>
                e
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --bg1: #000000;
    --bg2: #272727;
    --bg3: #3f3f3f;

    --txt1: #ffffff;
    --txt2: #d1d1d1;

    --font1: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    --accent1: #c47ffd;
}

body {
    font-family: var(--font1);
    margin: 0px;
    background-color: var(--bg1);
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0px;
}

button,
input,
textarea {
    font-family: var(--font1);
}

.loginArea {
    display: flex;
    justify-content: center;
}

.loginContainer {
    margin-top: 25px;
    width: 450px;
    background-color: var(--bg1);
    color: var(--txt1);
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.loginContainerHeading {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 20px;
}

.instanceTextArea {
    box-sizing: border-box;
    width: 100%;
}

.ipt {
    background-color: var(--bg2);
    border: 2px solid var(--bg2);
    color: var(--txt1);
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 7px;
}

.ipt:focus {
    outline: none;
    border: 2px solid var(--accent1);
}

.iptlabel {
    padding-bottom: 10px;
}

.instanceLoginButtons {
    margin-top: 10px;
    float: right
}

.loginbtn {
    margin-left: 10px;
    background-color: var(--bg2);
    border: 2px solid var(--bg2);
    color: var(--txt1);
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 7px;
}

.loginbtn:hover {
    background-color: var(--bg3);
    border: 2px solid var(--bg3);
}

.mColumns {
    display: flex;
}

.mColumn {
    background-color: var(--bg2);

    width: 325px;
    min-width: 275px !important;
    height: 100vh;

    border-right: 1px solid var(--bg1);
}

.betaTag {
    background-color: var(--bg3);
    color: var(--txt1);

    margin-left: 6px;

    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;

    border-radius: 5px;

    font-size: 12px;
}

.mColumnHeader {
    padding: 10px;
    padding-top: 12px;
    padding-bottom: 12px;

    color: var(--txt1);

    border-bottom: 1px solid var(--bg1);
}

.noSelection {
    color: var(--txt2);
}

.postAreaHeader {
    display: flex;
    margin-bottom: 10px;
}

.postArea {
    margin: 10px;
}

.postArea-avatars {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.postArea-names {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.postArea-displayName {
    color: var(--txt1);
    font-size: 16px;
}

.postArea-userName {
    color: var(--txt2);
    font-size: 14px;
}

.postArea-avatar {
    height: 45px;
    margin-right: 10px;

    border-radius: 7px;
}

.postArea-textArea {
    margin-top: 0px !important;

    width: 100%;
    box-sizing: border-box;

    padding: 5px;

    font-size: 14px;

    min-height: 35px;
    max-height: 200px;
    height: 100px;
    resize: vertical;

    border-radius: 7px;
    border: 2px solid var(--bg3);
    background-color: var(--bg3);

    color: var(--txt2);
    outline: none;
}

.postArea-visibility {
    width: 45px;
}
</style>