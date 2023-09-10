<script setup>
import Icon from '../components/Icon.vue';
import Post from '../components/Post.vue';
import PostArea from '../components/PostArea.vue';
import Modal from '../components/Modal.vue';
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
            avatar: "assets/none.png",
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
            language: "",
        },
        timeline: {
            home: [],
            home_new: [],
            home_last: "",
        }
    }),
    mounted() {
        this.closeModal()
        console.log("[Aster Startup] Login State: " + this.getLocalStorage("loginstate"))

        if (this.getLocalStorage("loginstate") === 'done') {
            this.loginstate = this.getLocalStorage("loginstate");
            this.afterLogin()
            this.getAccountDetails()
            this.loadToots()
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
            this.removeLocalStorage("user_avatar")
            this.removeLocalStorage("user_displayname")
            this.removeLocalStorage("user_username")

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

            console.log(gettingtoken_response)

            this.setLocalStorage("token", gettingtoken_response.access_token)

            this.token = gettingtoken_response.access_token;

            this.getAccountDetails()
            this.afterLogin()

            this.setLocalStorage("loginstate", "done")
            this.loginstate = 'done';
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

            this.setLocalStorage("user_avatar", this.user.avatar)
            this.setLocalStorage("user_displayname", this.user.displayname)
            this.setLocalStorage("user_username", this.user.username)
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

            this.removeLocalStorage("user_avatar")
            this.removeLocalStorage("user_displayname")
            this.removeLocalStorage("user_username")

            this.removeLocalStorage("token")
            this.removeLocalStorage("instanceurl")
            this.removeLocalStorage("loginstate")

            this.removeLocalStorage("app_clientid")
            this.removeLocalStorage("app_secret")
            this.removeLocalStorage("app_vapidkey")

            this.removeLocalStorage("ui_modal")

            location.reload();
        },

        async openModal(modal) {
            this.setLocalStorage("ui_modal", modal)
        },
        async closeModal() {
            this.removeLocalStorage("ui_modal")
        },

        async loadToots() {
            let initialtoots = await fetch("https://" + this.instanceurl + "/api/v1/timelines/home?limit=40", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let initialtoots_response = await initialtoots.json()

            initialtoots_response.forEach((element) =>
                this.timeline.home.push(element) &&
                console.log(element)
            )

            this.timeline.home_last = initialtoots_response.at(-1).id;

            this.startStream()
        },
        async loadMoreToots(id) {
            let moretoots = await fetch("https://" + this.instanceurl + "/api/v1/timelines/home?max_id=" + id + "?limit=40", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.token,
                }
            })
            let moretoots_response = await moretoots.json()

            moretoots_response.forEach((element) =>
                this.timeline.home.push(element)
            )

            this.timeline.home_last = moretoots_response.at(-1).id;
        },
        async resetFeed() {
            this.timeline.home = [];
            this.loadToots()
        },

        async startStream() {
            let userSocket = new WebSocket("wss://" + this.instanceurl + "/api/v1/streaming?access_token=" + this.token + "&stream=user");

            userSocket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                this.timeline.home_new.push(JSON.parse(msg.payload))
            }
        },

        async onScroll(e) {
            const { scrollTop, offsetHeight, scrollHeight } = e.target
            if ((scrollTop + offsetHeight) >= scrollHeight) {
                this.loadMoreToots(this.timeline.home_last)
            }
        }
    }
}
</script>

<template>
    <div>
        ea
    </div>
</template>

<style>
.gsLink {
    display: block;

    margin: 10px;
    padding: 15px 20px 15px 20px;

    color: var(--txt2);
    text-decoration: none;

    border-radius: 10px;
}

.gsLink:hover {
    color: var(--txt1);
    background-color: var(--bg3);
}
</style>