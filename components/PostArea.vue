<script>
export default {
    data: () => ({
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
                contentWarning: "false",
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
            replying: "",
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
        }
    }),
    mounted() {
        this.populateData()
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

        async populateData() {
            this.instanceurl = this.getLocalStorage("instanceurl");
            this.token = this.getLocalStorage("token");

            this.user.avatar = this.getLocalStorage("user_avatar");
            this.user.displayname = this.getLocalStorage("user_displayname");
            this.user.username = this.getLocalStorage("user_username");
        },

        async sendToot() {
            if (this.toot.content != "") {
                console.log("[Aster Actions] Posting toot as @" + this.user.username + "@" + this.instanceurl + "...")

                var additional_status_options = `&visibility=${this.toot.visibility}`

                if (this.toot.spoiler_text && this.app.postArea.contentWarning === "true") {
                    var additional_status_options = (additional_status_options += `&spoiler_text=${this.toot.spoiler_text}`)
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

                if (sendtoot_response.error) {
                    this.toast(sendtoot_response.error)

                    console.log("[Aster Actions] Can't post toot: " + sendtoot_response.error)
                } else {
                    this.app.postArea.dropdown = ""
                    this.app.postArea.selectedBtn = ""

                    this.toot.content = ""
                    this.toot.media = ""
                    this.toot.poll.options = ""
                    this.toot.poll.expires_in = "1 day"
                    this.toot.poll.multiple = "false"
                    this.toot.poll.hide_totals = "false"
                    this.toot.sensitive = ""
                    this.toot.spoiler_text = ""
                    this.toot.visibility = "public"

                    console.log("[Aster Actions] Posted toot.")
                }
            }
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

        setPostAreaToggle(thetoggle) {
            if (thetoggle === 'contentwarning') {
                if (this.app.postArea.contentWarning === "true") {
                    this.app.postArea.contentWarning = "false"
                } else {
                    this.app.postArea.contentWarning = "true"
                }
            }
        },

        setTootOption(option, value) {
            if (option === 'visibility') {
                this.toot.visibility = value
            }
        },
    }
}
</script>

<template>
    <div class="postArea">
        <div class="postAreaHeader">
            <div class="postArea-avatars">
                <img class="postArea-avatar" :src="user.avatar" :alt="user.displayname + 's avatar'">
            </div>
            <div class="postArea-names">
                <NuxtLink :to="'/@' + user.username">
                    <p class="postArea-displayName">{{ user.displayname }}</p>
                    <p class="postArea-userName">@{{ user.username }}@{{ instanceurl }}</p>
                </NuxtLink>
            </div>
        </div>
        <div>
            <p class="mopAlert" v-if="toot.visibility === 'direct'">Mentioned People Only posts are still visible by
                instance admins and moderators, and are not end to end encrypted. <a class="underline"
                    :href="'https://' + instanceurl + '/privacy-policy'" target="_blank">Learn more</a>.</p>

            <input class="postArea-contentwarning" placeholder="Write your content warning here..."
                v-if="app.postArea.contentWarning === 'true'" v-model="this.toot.spoiler_text">
            <textarea class="postArea-textArea" placeholder="What's up?" v-model="toot.content"></textarea>
            <div>

                <div class="postArea-buttons">
                    <div class="postArea-buttons-left">
                        <button class="btn postArea-btn" @click="setPostAreaButton('attatchment')"
                            v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'attatchment' }">
                            <Icon name="paperclip" size="18px" />
                        </button>
                        <button class="btn postArea-btn" @click="setPostAreaButton('poll')"
                            v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'poll' }">
                            <Icon name="bar-chart-2" size="18px" />
                        </button>
                        <button class="btn postArea-btn" @click="setPostAreaButton('visibility')"
                            v-bind:class="{ pAbtnselected: this.app.postArea.selectedBtn === 'visibility' }">
                            <Icon name="globe" size="18px" v-if="toot.visibility === 'public'" />
                            <Icon name="unlock" size="18px" v-if="toot.visibility === 'unlisted'" />
                            <Icon name="users" size="18px" v-if="toot.visibility === 'private'" />
                            <Icon name="at-sign" size="18px" v-if="toot.visibility === 'direct'" />
                        </button>
                        <button class="btn postArea-btn postArea-cw-btn" @click="setPostAreaToggle('contentwarning')"
                            v-bind:class="{ pAbtnselected: this.app.postArea.contentWarning === 'true' }">
                            <span>
                                CW
                            </span>
                        </button>
                    </div>
                    <button class="btn postArea-btn postArea-btn-post" @click="sendToot()"
                        v-bind:class="{ pAbtnpostdisabled: this.toot.content === '' }">Toot</button>
                </div>


                <div class="postArea-attatchments-selector" v-if="app.postArea.dropdown === 'attatchment'">
                    <div class="postArea-attatchments-selector-option">
                        <Icon name="upload" color="var(--txt1)" size="20px" /> <span>Upload a file</span>
                    </div>
                </div>

                <div class="postArea-pollmaker" v-if="app.postArea.dropdown === 'poll'">
                    <input class="postArea-pollmaker-option" placeholder="Choice 1" v-model="this.toot.poll.options[1]">
                    <input class="postArea-pollmaker-option" placeholder="Choice 2" v-model="this.toot.poll.options[2]">
                    <input class="postArea-pollmaker-option" placeholder="Choice 3" v-model="this.toot.poll.options[3]"
                        v-if="app.postArea.poll.option >= 3">
                    <input class="postArea-pollmaker-option" placeholder="Choice 4" v-model="this.toot.poll.options[4]"
                        v-if="app.postArea.poll.option >= 4">
                    <input class="postArea-pollmaker-option" placeholder="Choice 5" v-model="this.toot.poll.options[5]"
                        v-if="app.postArea.poll.option >= 5">
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

                <div class="postArea-visibility" v-if="app.postArea.dropdown === 'visibility'">
                    <div class="postArea-visibility-option" @click="setTootOption('visibility', 'public')"
                        v-bind:class="{ pAoption: this.toot.visibility === 'public' }">
                        <Icon name="globe" color="var(--txt1)" size="18px" /> <span>Global</span>
                    </div>
                    <div class="postArea-visibility-option" @click="setTootOption('visibility', 'unlisted')"
                        v-bind:class="{ pAoption: this.toot.visibility === 'unlisted' }">
                        <Icon name="unlock" color="var(--txt1)" size="18px" /> <span>Unlisted</span>
                    </div>
                    <div class="postArea-visibility-option" @click="setTootOption('visibility', 'private')"
                        v-bind:class="{ pAoption: this.toot.visibility === 'private' }">
                        <Icon name="users" color="var(--txt1)" size="18px" /> <span>Followers Only</span>
                    </div>
                    <div class="postArea-visibility-option" @click="setTootOption('visibility', 'direct')"
                        v-bind:class="{ pAoption: this.toot.visibility === 'direct' }">
                        <Icon name="at-sign" color="var(--txt1)" size="18px" /> <span>Mentioned People
                            Only</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>