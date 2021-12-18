import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "./views/Main.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'default-page',
        component: Login,
        beforeEnter: (to, from, next) => {
            (localStorage.getItem("jwt") !== null) ? next({name: 'main'}) : next({name: 'auth-page'});
        }
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("jwt")) next();
            else next({
                name: 'auth-page',
            });
        }
    },
    {
        path: '/auth',
        name: 'auth-page',
        component: Login
    },
    {
        path: '/*',
        name: 'error-page',
        component: NotFound,
        props: {
            default: true,
            errorCode: "404",
            errorMsg: "Страницы по этому адресу не существует"
        }
    },
    {
        path: '/error',
        name: 'error-page-app',
        component: NotFound,
        props: {
            default: true,
            errorCode: "401",
            errorMsg: "Для доступа к приложению требуется авторизация."
        }
    }


]

export default new VueRouter({
    mode: 'history',
    routes
});




