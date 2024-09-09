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

  let storedUser: any = sessionStorage.getItem('user');
  storedUser     = storedUser ? JSON.parse(storedUser) : false;

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

        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    const removeUser = () => {
      userData.name = '';
      userData.email = '';
      userData.authToken = '';
      userData.isLoggedIn = false;

      sessionStorage.removeItem('user');
    }

    if (Object.keys(storedUser).length > 0) {
      setUser(storedUser);
    }    
    return { userData, setUser, removeUser }
})
