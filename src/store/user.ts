import { defineStore } from "pinia";
import { ref } from "vue";

export type user = {
  authToken?: string,
  isLoggedIn: boolean
}

export const userStore = defineStore('user', () => {
    const authToken = ref('asad'); 
    const isLoggedIn = ref(true);
    
    return { authToken, isLoggedIn }
})
