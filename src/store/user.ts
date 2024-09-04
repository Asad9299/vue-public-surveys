import { defineStore } from "pinia";
import { ref } from "vue";

export type user = {
  authToken?: string,
  }

export const userStore = defineStore('user', () => {
    const authToken = ref('asad');
  
    return { authToken }

})