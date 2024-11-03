<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="register()">
          
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userData.name">
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userData.email">
            </div>
          </div>
  
          <div>
            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userData.password">
            </div>
          </div>
          
          <div>
            <div>
              <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            </div>
            <div class="mt-2">
              <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userData.password_confirmation">
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>  
              Register
            </button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <RouterLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login to your account</RouterLink>
        </p>
      </div>
    </div>
  </template>

  <script setup lang="ts">
    import { useRouter } from 'vue-router';
    import ajax from '../../store/ajax.ts';
    import { type User } from '../../store/user.ts';
    import { userStore } from '../../store/user.ts';
    import {reactive, ref} from "vue";
    import { useToast } from 'vue-toastification';
    import { handleServerValidationErrors } from "../../helpers/utility.ts"

    const userData: User = reactive({
        id: 0,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    const userStoreObj = userStore();
    const router       = useRouter();
    const toast        = useToast();
    const isLoading    = ref(false); 


    const register = async () => {
      try {
        isLoading.value = true;
        const ajaxObj = new ajax();
        const registerResponse = await ajaxObj.post('register', userData);
        if(registerResponse.status === 200) {
          // Set the user in Pinia
          userData.authToken = registerResponse.data.token;
          userStoreObj.setUser(userData);
          isLoading.value = false;

          toast.success('Congratulations! You have been onboarded successfully!');
          // redirect to dashboard
          router.push({name: 'dashboard'});          
        }
      } catch (error: any) {
          isLoading.value = false;
          if (error.response.status === 422) {
            const formKeys = Object.keys(userData);
            const errors   = error.response.data.errors;
            handleServerValidationErrors(formKeys, errors);
          }
      }
    }
  </script>