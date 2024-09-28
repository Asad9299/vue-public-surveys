import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../components/layouts/MainLayout.vue";
import { authRoutes } from "./auth";
import Surveys from "../views/Surveys.vue";
import { userStore } from "../store/user";
import SurveyView from "../views/SurveyView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRoutes,
        {
            path      : '/',
            redirect  : '/dashboard',
            meta        : {
                requiresAuth: true
            },
            component : MainLayout, 
            children  : [
                {
                    path : '/dashboard', 
                    name : 'dashboard',
                    component: Dashboard
                },
                {
                    path : '/surveys', 
                    name: 'surveys',
                    component : Surveys
                },
                {
                    path : '/survey/create', 
                    name: 'surveyCreate',
                    component : SurveyView
                },
                {
                    path : '/survey/:id', 
                    name: 'surveyView',
                    component : SurveyView
                }
                
            ]
        },
    ]    
});

router.beforeEach((to, from, next: any) => {
    const userStoreObj = userStore();
    if(to.meta.requiresAuth && !userStoreObj.userData.authToken) {
        next({name: 'login'}); 
    } else if (userStoreObj.userData.authToken && !to.meta.requiresAuth) {
        next({name: 'dashboard'});
    } else {
        next();
    }
});


export default router;