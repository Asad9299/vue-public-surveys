<template>
    <div class="py-5 px-8">
        <form @submit.prevent="saveAnswers" class="container mx-auto">
            <div class="grid grid-cols-6 items-center">
                <div class="mr-4">
                    <img v-if="survey?.image_url" :src=survey?.image_url alt="Survey Image" />
                    <span v-else
                        class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-[80%] w-[80%] text-gray-300"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                        />
                        </svg>
                    </span>
                </div>

                <div class="col-span-5">
                    <!-- Survey Title -->
                    <h1 class="text-3xl-mb-3">
                        {{ survey?.title }}
                    </h1>
                    <!-- Survey Description -->
                    <p class="text-gray-500 text-sm">
                        {{ survey?.description }}
                    </p>
                </div>
            </div>
            
            <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
                    <div class="text-xl mb-3 font-semibold ">Thank you for participating in this survey.</div>
                    <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit another response
                    </button>
            </div>
            <div v-else>
                <hr class="my-3" />
                <div v-for="(question, index) in survey?.questions">
                    <QuestionViewer 
                        v-model="answers[question.id]"
                        :question="question"
                        :index="index"
                    />
                </div>

                <button 
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import QuestionViewer from '../components/viewer/QuestionViewer.vue';
import ajax from '../store/ajax';
import { useRoute } from 'vue-router';
import { type Survey } from '../store/survey';

const surveyFinished = ref(false);
const answers:any = ref({});

// Get Survey By Slug
const route  = useRoute();
const slug  = route.params.slug as string;

const survey = ref<Survey>();
const ajaxObj = new ajax();

const getSurveyBySlug = async ( slug: string ) => {
    const response = await ajaxObj.get(`survey-by-slug/${slug}`);
    survey.value  = response.data.data;

}
getSurveyBySlug( slug );

const saveAnswers = () => {
    console.log("answers", answers.value);
} 
</script>