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
        
            <div>
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
import { useToast } from 'vue-toastification';
import { handleServerValidationErrors } from '../helpers/utility';

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

const toast = useToast();

const saveAnswers = async () => {
    try {
        let data = {
            answers: answers.value
        }
        const response = await ajaxObj.post(`survey/${survey.value?.id}/answer`, JSON.parse(JSON.stringify(data)) );

        if ( 201 === response.status ) {
            toast.success('Answer Recorded Successfully!');   
        } else {
            toast.error('Error, recording the answer. Please try again after sometime');
        }
    } catch ( error: any ) {
        if (error && error.response && 422 === error.response.status) {
            const formKeys = Object.keys({answers});
            const errors   = error.response.data.errors;
            handleServerValidationErrors(formKeys, errors);
            return false;
        } else if ( error && error.response && 401 === error.response.status ) {
            toast.error(error.response.data.error);
            return false;
        } else {
            const errorMessage = error.response?.data.message ?? "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
        }
    }
}   
</script>