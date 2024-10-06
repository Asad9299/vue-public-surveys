import { defineStore } from "pinia";
import { reactive } from "vue";

export type User = {
  id: number,
  name?: string,
  email: string,
  password?: string,
  password_confirmation?: string,
  authToken?: string
}

export const userStore = defineStore('user', () => {

    const storedUser = localStorage.getItem('user');
    const initialUser: User = storedUser ? JSON.parse(storedUser) : {
        id: 0,
        name: '',
        email: '',
        authToken: ''
    };

    const userData: User = reactive({
        ...initialUser 
    });

    const setUser = (userObj: User) => {
        Object.assign(userData, userObj);
        localStorage.setItem('user', JSON.stringify(userData)); 
    }

    const getUser = (): User => {
        return userData;
    }

    const removeUser = () => {
        userData.id = 0;
        userData.name = '';
        userData.email = '';
        userData.authToken = '';
        
        localStorage.removeItem('user');
    }

    return { userData, setUser, getUser, removeUser };
});
