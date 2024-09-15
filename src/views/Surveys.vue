<template>
    <PageComponent>
       <template v-slot:header>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    Surveys 
                </h1>
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
            :to="({ path: `survey/${survey.id}`})"
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
        </div>
      </div>
    </div>
       
    </PageComponent>
</template>

<script setup lang="ts">
    import PageComponent from '../components/PageComponent.vue';
    import { ref } from "vue";
    import { surveyStore, type Survey } from '../store/survey';

    const surveyStoreObj = surveyStore();

    const surveys = ref<Survey[]>([]);
    surveys.value = surveyStoreObj.surveys;

</script>