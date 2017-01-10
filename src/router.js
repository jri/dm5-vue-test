import Vue from "vue"
import VueRouter from "vue-router"
import http from "axios"
import store from "./store"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/infobits"
    },
    {
      path: "/login",
      component: require("./components/login-page.vue")
    },
    {
      path: "/infobits",
      component: require("./components/infobits-app.vue"),
      beforeEnter: (to, from, next) => http.get("/accesscontrol/user")
        .then(response => {
          if (response.status == 200) {
            return response.data
          } else {
            console.log("Router(/infobits): not logged in yet -- redirect to /login")
            next("/login")
          }
        })
        .then(username => {
          if (username) {
            http.get("/infobits/workspace").then(response => {
              var workspaceId = response.data.id
              console.log("Router(/infobits): already logged in", username, workspaceId)
              setWorkspaceCookie(workspaceId)
              store.dispatch("initStore", username)
              next()
            })
          }
        })
        .catch(error => console.log("Error while checking logged in user", error))
    }
  ]
})

function setWorkspaceCookie(workspaceId) {
  document.cookie = "dm4_workspace_id=" + workspaceId + ";path=/"
}
