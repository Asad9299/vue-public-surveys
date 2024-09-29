<template>
    <PageComponent>
       <template v-slot:header>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    Surveys 
                </h1>
                
                <router-link
                  :to="({ name: 'surveyCreate'})"
                  class="absolute right-0 transform -translate-y-1/2 inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold text-sm rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  Create Survey
                </router-link> 
            </div>
        </header>
       </template>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div
        v-for="survey in surveyStoreObj.surveys"
        :key="survey.id"
        class="
          flex flex-col
          py-4
          px-6
          shadow-md
          bg-white
          hover:bg-gray-50
          h-[470px]
        "
      >
        <img :src="survey.image" alt="" class="w-full h-48 object-cover" />
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        
        <div v-html="survey.description" class="overflow-hidden flex-1">
        </div>

        <div class="flex justify-between items-center mt-3">
          <router-link
            :to="({ name: 'surveyView', params: { id: survey.id }})"
            class="
              flex
              py-2
              px-4
              border border-transparent
              text-sm
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </router-link>
          
          <!-- Delete Button -->
          <button 
            @click="deleteSurvey(survey)" 
            class="flex items-center text-red-600 hover:text-red-800 focus:outline-none"
            aria-label="Delete Survey"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash h-5 w-5"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>  
      </div>
    </div>
  </div>
       
  </PageComponent>
</template>

<script setup lang="ts">
    import PageComponent from '../components/PageComponent.vue';
    import { onMounted } from "vue";
    import { surveyStore, type Survey } from '../store/survey';

    const surveyStoreObj = surveyStore();

    // Fetch the surveys when the component is mounted
    onMounted(() => {
      surveyStoreObj.surveyList();
    });

    const deleteSurvey = (survey: Survey) => {
      if (confirm('Are you sure you want to delete this Survey?')) {
        // @TODO: Delete Survey Code goes here.
      }
    }
</script>