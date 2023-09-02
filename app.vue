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
    },
    app: {
      clientid: "",
      secret: "",
    },
    tootarea: ""
  }),
  mounted() {
    console.log("[Aester Startup] Login State: "+this.getLocalStorage("loginstate"))

    if (this.getLocalStorage("loginstate") === 'done') {
      this.loginstate = this.getLocalStorage("loginstate");
      this.afterLogin()
      this.getAccountDetails()
    }
    
  },
  methods: {
    setLocalStorage(key, value) {
      if(process.client) {
        localStorage.setItem(key, value)
      }
    },
    getLocalStorage(key) {
      if(process.client) {
        return localStorage.getItem(key);
      }
    },
    removeLocalStorage(key) {
      if(process.client) {
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

      window.open("https://" + this.instanceurl + "/oauth/authorize?client_id="+this.app.clientid+"&scope=read+write+push&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code", '_blank');
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
          "Authorization": "Bearer "+this.token,
        }
      })
      const accountdetails_response = await accountdetails.json()

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
      console.log("[Aester Actions] Posting toot as @"+this.user.username+"@"+this.instanceurl+"...")

      const sendtoot = await fetch("https://" + this.instanceurl + "/api/v1/statuses", {
        method: "POST",
        headers: {
          "Authorization": "Bearer "+this.token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `status=${this.tootarea}`,
      })
      const sendtoot_response = await sendtoot.json()

      console.log("[Aester Actions] Posted toot. Response: "+sendtoot_response)
    }
  }
}
</script>

<template>



</template>
