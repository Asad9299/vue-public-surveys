import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

export const authRoutes  = [
        {
            path      : '/login',
            name      : 'login',
            component : Login,
            meta      : {
                requiresAuth: false,
            }
        },
        {
            path     : '/register',
            name     : 'register',
            component: Register,
            meta      : {
                requiresAuth: false,
            }
        }
];
