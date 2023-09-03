<script setup>
import Icon from '../components/Icon.vue';
import Post from '../components/Post.vue';
</script>


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
            postArea: {
                selectedBtn: "",
                dropdown: "",
                poll: {
                    options: 2
                }
            },
            clientid: "",
            secret: "",
        },
        toot: {
            content: "",
            media: [],
            poll: {
                options: ["", "", "", "", ""],
                expires_in: "1 day",
                multiple: "false",
                hide_totals: "false",
            }, 
            sensitive: "",
            spoiler_text: "",
            visibility: "public",
            language: ""
        },
        timeline: {
            toots: "",
        }
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
                body: `client_name=Aster&redirect_uris=urn:ietf:wg:oauth:2.0:oob&scopes=read write push&website=https://as.blueb.me/`,
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

            this.loadToots()
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

            var additional_status_options = `&visibility=${this.toot.visibility}`

            if (this.toot.poll.options[1]) {
                var additional_status_options = `&visibility=${this.toot.visibility}&poll[options[${this.toot.poll.options}],expires_in=${this.toot.poll.expires_in},multiple=${this.toot.poll.multiple},hide_totals=${this.toot.poll.hide_totals}]`
            }

            const sendtoot = await fetch("https://" + this.instanceurl + "/api/v1/statuses", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `status=${this.toot.content}${additional_status_options}`,
            })
            const sendtoot_response = await sendtoot.json()

            this.app.postArea.dropdown = ""
            this.app.postArea.selectedBtn = ""
            this.app.toot.content = ""

            console.log("[Aster Actions] Posted toot. Response below.")
            console.log(sendtoot_response)
        },

        setPostAreaButton(thebutton) {
            if (thebutton === "sensitive") {
                if (this.toot.sensitive === "true") {
                    this.toot.sensitive = "false"
                } else {
                    this.toot.sensitive = "true"
                }
            } else {
                if (thebutton === this.app.postArea.selectedBtn) {
                    this.app.postArea.selectedBtn = ""
                    this.app.postArea.dropdown = ""
                } else {
                    this.app.postArea.selectedBtn = thebutton
                    this.app.postArea.dropdown = thebutton
                }
            }
        },

        setTootOption(option, value) {
            if (option === 'visibility') {
                this.toot.visibility = value
            }
        },

        async loadToots(max_id) {
            const loadtoot = await fetch("https://" + this.instanceurl + "/api/v1/timelines/home", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            const loadtoot_response = await loadtoot.json()

            console.log(loadtoot_response);
            this.timeline.toots = loadtoot_response;
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
                        <textarea class="postArea-textArea" placeholder="What's up?" v-model="toot.content"></textarea>
                        <div>
                            <div class="postArea-buttons">
                                <div class="postArea-buttons-left">
                                    <button class="btn postArea-btn" @click="setPostAreaButton('attatchment')" v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'attatchment' }">
                                        <Icon name="paperclip" size="18px" />
                                    </button>
                                    <button class="btn postArea-btn" @click="setPostAreaButton('poll')" v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'poll' }">
                                        <Icon name="bar-chart-2" size="18px" />
                                    </button>
                                    <button class="btn postArea-btn" @click="setPostAreaButton('visibility')" v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'visibility' }">
                                        <Icon name="globe" size="18px" v-if="this.toot.visibility === 'public'" />
                                        <Icon name="lock" size="18px" v-if="this.toot.visibility === 'unlisted'" />
                                        <Icon name="users" size="18px" v-if="this.toot.visibility === 'private'" />
                                        <Icon name="at-sign" size="18px" v-if="this.toot.visibility === 'direct'" />
                                    </button>
                                    <button class="btn postArea-btn" @click="setPostAreaButton('sensitive')" v-bind:class="{ pAbtnselected: this.toot.sensitive === 'true' }">CW</button>
                                    <button class="btn postArea-btn" v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'lang' }">EN</button>
                                </div>
                                <button class="btn postArea-btn postArea-btn-post" @click="sendToot()">Toot</button>
                            </div>

                            
                            <div class="postArea-attatchments-selector" v-if="this.app.postArea.dropdown === 'attatchment'">
                                <div class="postArea-attatchments-selector-option">
                                    <Icon name="upload" color="var(--txt1)" size="20px" /> <span>Upload a file</span>
                                </div>
                            </div>

                            <div class="postArea-pollmaker" v-if="this.app.postArea.dropdown === 'poll'">
                                <input class="postArea-pollmaker-option" placeholder="Choice 1" v-model="this.toot.poll.options[1]">
                                <input class="postArea-pollmaker-option" placeholder="Choice 2" v-model="this.toot.poll.options[2]">
                                <input class="postArea-pollmaker-option" placeholder="Choice 3" v-model="this.toot.poll.options[3]" v-if="this.app.postArea.poll.option >= 3">
                                <input class="postArea-pollmaker-option" placeholder="Choice 4" v-model="this.toot.poll.options[4]" v-if="this.app.postArea.poll.option >= 4">
                                <input class="postArea-pollmaker-option" placeholder="Choice 5" v-model="this.toot.poll.options[5]" v-if="this.app.postArea.poll.option >= 5">
                                <select class="postArea-pollmaker-select">
                                    <option @click="this.app.postArea.poll.option = 2">2 choices</option>    
                                    <option @click="this.app.postArea.poll.option = 3">3 choices</option>  
                                    <option @click="this.app.postArea.poll.option = 4">4 choices</option>  
                                    <option @click="this.app.postArea.poll.option = 5">5 choices</option>  
                                </select>
                                <select class="postArea-pollmaker-select">
                                    <option @click="this.toot.poll.multiple = 'false'">Single choice</option>    
                                    <option @click="this.toot.poll.expires_in = 'true'">Multiple Choice</option>
                                </select>
                                <select class="postArea-pollmaker-select">
                                    <option @click="this.toot.poll.expires_in = '5 minutes'">5 minutes</option>    
                                    <option @click="this.toot.poll.expires_in = '30 minutes'">30 minutes</option>  
                                    <option @click="this.toot.poll.expires_in = '1 hour'">1 hour</option>  
                                    <option @click="this.toot.poll.expires_in = '6 hours'">6 hours</option>   
                                    <option @click="this.toot.poll.expires_in = '12 hours'">12 hours</option>   
                                    <option @click="this.toot.poll.expires_in = '1 day'">1 day</option>   
                                    <option @click="this.toot.poll.expires_in = '3 days'">3 days</option>   
                                    <option @click="this.toot.poll.expires_in = '7 days'">7 days</option> 
                                </select>
                            </div>
                            
                            <div class="postArea-visibility" v-if="this.app.postArea.dropdown === 'visibility'">
                                <div class="postArea-visibility-option" @click="setTootOption('visibility', 'public')" v-bind:class="{ pAoption: this.toot.visibility === 'public' }">
                                    <Icon name="globe" color="var(--txt1)" size="20px" /> <span>Global</span>
                                </div>
                                <div class="postArea-visibility-option" @click="setTootOption('visibility', 'unlisted')" v-bind:class="{ pAoption: this.toot.visibility === 'unlisted' }">
                                    <Icon name="lock" color="var(--txt1)" size="20px" /> <span>Unlisted</span>
                                </div>
                                <div class="postArea-visibility-option" @click="setTootOption('visibility', 'private')" v-bind:class="{ pAoption: this.toot.visibility === 'private' }">
                                    <Icon name="users" color="var(--txt1)" size="20px" /> <span>Followers Only</span>
                                </div>
                                <div class="postArea-visibility-option" @click="setTootOption('visibility', 'direct')" v-bind:class="{ pAoption: this.toot.visibility === 'direct' }">
                                    <Icon name="at-sign" color="var(--txt1)" size="20px" /> <span>Mentioned People Only</span>
                                </div>
                            </div>
                            


                        </div>
                    </div>
                </div>
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p>Home</p>
                </div>
                <div v-for="toot in this.timeline.toots">
                    <Post :content="toot" :instanceurl="this.instanceurl" :token="this.token" />
                </div>
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
    --bg4: #525151;

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

    width: 375px;
    min-width: 288px !important;
    height: 100vh;
    overflow-y: scroll;

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

.postArea-btn {
    background-color: var(--bg3);

    border: 2px solid var(--bg3);
    border-radius: 7px;

    padding: 6px;
    margin-top: 10px;
    margin-right: 5px;

    color: var(--txt1);
}

.postArea-btn-post {
    padding-left: 12px;
    padding-right: 12px;
    margin-right: 0px;
}

.postArea-buttons {
    display: flex;
}

.postArea-buttons-left {
    flex-grow: 3;
}

.postArea-visibility {
    background-color: var(--bg3);

    border-radius: 7px;

    margin-top: 10px;
    padding: 4px!important;

    box-sizing: border-box;
    width: 100%;
}

.postArea-visibility-option {
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;

    border: 2px solid transparent;

    color: var(--txt2);

    span {
        font-size: 15px;
        margin-left: 7px;
    }
}

.postArea-visibility-option:hover {
    background-color: var(--bg2);
    border: 2px solid transparent;
    border-radius: 5px;
}

.postArea-attatchments-selector {
    background-color: var(--bg3);

    border-radius: 7px;

    margin-top: 10px;
    padding: 4px!important;

    box-sizing: border-box;
    width: 100%;
}

.postArea-attatchments-selector-option:hover {
    background-color: var(--bg2);
    border-radius: 5px;
}


.postArea-attatchments-selector-option {
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;

    border: 2px solid transparent;

    color: var(--txt2);

    span {
        font-size: 15px;
        margin-left: 7px;
    }
}

.postArea-attatchments-selector-option:hover {
    background-color: var(--bg2);
    border-radius: 5px;
}

.postArea-pollmaker {
    background-color: var(--bg3);

    border-radius: 7px;

    margin-top: 10px;
    padding: 4px!important;

    box-sizing: border-box;
    width: 100%;
}

.pAbtnselected {
    background-color: var(--bg4);
    border-color: var(--accent1);
}

.pAoption {
    background-color: var(--bg4);
    border-color: var(--bg4);
    border-radius: 5px;
}

.postArea-pollmaker-option {
    background-color: var(--bg3);
    border-color: var(--bg3);

    border-radius: 5px;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;

    margin-bottom: 10px;

    border: 2px solid var(--bg4);

    color: var(--txt2);

    box-sizing: border-box;
    width: 100%;

    outline: none;
}

.postArea-pollmaker-option:hover {
    background-color: var(--bg2);
    border-color: var(--bg2);

    border: 2px solid var(--bg4);

    color: var(--txt2);

    box-sizing: border-box;
    width: 100%;
}

.postArea-pollmaker-select {
    font-family: var(--font1);

    background-color: var(--bg3);
    border-color: var(--bg3);

    border-radius: 5px;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;

    margin-top: 10px;

    border: 2px solid var(--bg4);

    color: var(--txt2);

    box-sizing: border-box;
    width: 100%;
}

</style>