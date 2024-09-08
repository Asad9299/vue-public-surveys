import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export type user = {
  name: string,
  email: string,
  password?: string,
  password_confirmation?: string,
  authToken?: string,
  isLoggedIn?: boolean
}

export const userStore = defineStore('user', () => {
    // const authToken = ref(''); 
    // const isLoggedIn = ref(true);

    const userData: user = reactive({
        name: '',
        email: '',
        authToken: '',
        isLoggedIn: false,
      });

    const setUser = (userObj: user) => {
        userData.name = userObj.name;
        userData.email = userObj.email;
        userData.authToken = userObj.authToken;
        userData.isLoggedIn = userObj.isLoggedIn;
        
        console.log('set user data', userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    }
    
    return { userData, setUser }
})
