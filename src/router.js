import Vue from "vue"
import VueRouter from "vue-router"
import http from "axios"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: "/",
      beforeEnter: (to, from, next) =>
        http.get("/accesscontrol/user").then(response => {
          if (response.status == 200) {
            var username = response.data
            console.log("Already logged in", username)
            next("/infobits")
          } else {
            console.log("Not logged in yet")
            next("/login")
          }
        })
        .catch(error => console.log("Error while checking logged in user", error))
    },
    {path: "/login",    component: require("./components/login-page.vue")},
    {path: "/infobits", component: require("./components/infobits-app.vue")}
  ]
})
