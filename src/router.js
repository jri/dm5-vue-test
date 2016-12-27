import Vue from "vue"
import VueRouter from "vue-router"
import http from "axios"
import store from "./store"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: "/", redirect: "/infobits"
    },
    {
      path: "/login", component: require("./components/login-page.vue")
    },
    {
      path: "/infobits", component: require("./components/infobits-app.vue"),
      beforeEnter: (to, from, next) =>
        http.get("/accesscontrol/user").then(response => {
          if (response.status == 200) {
            var username = response.data
            console.log("Router(/infobits): already logged in", username)
            store.dispatch("initStore", username)
            next()
          } else {
            console.log("Router(/infobits): not logged in yet")
            next("/login")
          }
        })
        .catch(error => console.log("Error while checking logged in user", error))
    }
  ]
})
