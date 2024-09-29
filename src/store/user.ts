import { defineStore } from "pinia";
import { reactive } from "vue";

export type User = {
  id: number,
  name?: string,
  email: string,
  password?: string,
  password_confirmation?: string,
  authToken?: string,
  isLoggedIn?: boolean
}

export const userStore = defineStore('user', () => {

  let storedUser: any = sessionStorage.getItem('user');
  storedUser     = storedUser ? JSON.parse(storedUser) : false;

    const userData: User = reactive({
        id: 0,
        name: '',
        email: '',
        authToken: '',
        isLoggedIn: false,
      });

    const setUser = (userObj: User) => {
        userData.id         = userObj.id;
        userData.name       = userObj.name;
        userData.email      = userObj.email;
        userData.authToken  = userObj.authToken;
        userData.isLoggedIn = userObj.isLoggedIn;

        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    const getUser = (): User => {
      return storedUser;
    }

    const removeUser = () => {
      userData.id = 0;
      userData.name = '';
      userData.email = '';
      userData.authToken = '';
      userData.isLoggedIn = false;

      sessionStorage.removeItem('user');
    }

    if (Object.keys(storedUser).length > 0) {
      setUser(storedUser);
    }    
    return { userData, setUser, getUser, removeUser }
})
