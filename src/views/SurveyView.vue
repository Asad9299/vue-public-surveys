<template>
    <PageComponent>
        <template v-slot:header>
            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                        {{  route.params.id ? formData.title : "Create a Survey" }} 
                    </h1>
                </div>
            </header>
       </template>
    
    <div>
        <div>
            <div>
                <form @submit.prevent="saveSurvey" class="relative">
                    <!-- Show Loader -->
                    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <PulseLoader />
                    </div>
                    <!-- Show Loader -->
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <!-- Survey Fields -->
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <!-- Image -->
                            <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div class="mt-1 flex items-center">
                                <img
                                    v-if="image_url"
                                    :src="image_url"
                                    :alt="formData.title"
                                    class="w-64 h-48 object-cover"
                                />
                                <span
                                    v-else
                                    class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[80%] w-[80%] text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                    fill-rule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clip-rule="evenodd"
                                    />
                                </svg>
                                </span>
                                <button
                                type="button"
                                class="
                                    relative
                                    overflow-hidden
                                    ml-5
                                    bg-white
                                    py-2
                                    px-3
                                    border border-gray-300
                                    rounded-md
                                    shadow-sm
                                    text-sm
                                    leading-4
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-50
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                    cursor-pointer
                                "
                                >
                                <input                  
                                    type="file"
                                    accept="image/*" 
                                    @change="imagePreview"
                                    class="
                                    absolute
                                    left-0
                                    top-0
                                    right-0
                                    bottom-0
                                    opacity-0
                                    cursor-pointer
                                    "
                                />
                                Change
                                </button>
                            </div>
                            </div>
                            <!--/ Image -->

                            <!-- Title -->
                            <div>
                            <label
                                for="title"
                                class="block text-sm font-medium text-gray-700"
                                >Title</label
                            >
                            <input
                                type="text"
                                name="title"
                                id="title"
                                v-model="formData.title"
                                class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                block
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                                "
                            />
                            </div>
                            <!--/ Title -->

                            <!-- Description -->
                            <div>
                            <label
                                for="about"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <div class="mt-1">
                                <textarea
                                id="description"
                                name="description"
                                v-model="formData.description"
                                rows="3"
                                class="
                                    shadow-sm
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    mt-1
                                    block
                                    w-full
                                    sm:text-sm
                                    border border-gray-300
                                    rounded-md
                                "
                                placeholder="Describe your survey"
                                />
                            </div>
                            </div>
                            <!-- Description -->

                            <!-- Expire Date -->
                            <div>
                            <label
                                for="expire_date"
                                class="block text-sm font-medium text-gray-700"
                                >Expire Date</label
                            >
                            <input
                                type="date"
                                name="expire_date"
                                id="expire_date"
                                class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                block
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                                "
                                v-model="formData.expire_date"
                            />
                            </div>
                            <!--/ Expire Date -->

                            <!-- Status -->
                            <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                id="status"
                                name="status"
                                v-model="formData.status"
                                type="checkbox"
                                class="
                                    focus:ring-indigo-500
                                    h-4
                                    w-4
                                    text-indigo-600
                                    border-gray-300
                                    rounded
                                "
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="status" class="font-medium text-gray-700"
                                >Active</label
                                >
                                <p class="text-gray-500">
                                Active survey and make it public
                                </p>
                            </div>
                            </div>
                            <!--/ Status -->
                        </div>
                        <!--/ Survey Fields -->

                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <h3 class="text-2xl font-semibold flex items-center justify-between">
                                Questions

                            <!-- Add new question -->
                            <button
                            type="button"
                            class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                            @click="addQuestion(formData.questions.length ?? 0)">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            Add Question
                            </button>
                            <!--/ Add new question -->
                        </h3>
                    
                        <div v-if="!formData.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                        </div>
                        
                        <div v-for="(question, index) in formData.questions" >
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            >

                            </QuestionEditor>
                        </div>
                        </div>

                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                class="
                                    inline-flex
                                    justify-center
                                    py-2
                                    px-4
                                    border border-transparent
                                    shadow-sm
                                    text-sm
                                    font-medium
                                    rounded-md
                                    text-white
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                "
                                >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </PageComponent>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import PageComponent from '../components/PageComponent.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Question, Survey } from '../store/survey';
    import QuestionEditor from '../components/editor/QuestionEditor.vue';
    // @ts-ignore
    import { v4 as uuidv4 } from 'uuid';
    import ajax from '../store/ajax';
    import { type User, userStore } from '../store/user';
    import { useToast } from 'vue-toastification';
    import { handleServerValidationErrors } from '../helpers/utility';
    // @ts-ignore
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(false);
    
    const ajaxObj = new ajax();
    const userStoreObj = userStore();
    const toast = useToast();
    const image_url = ref();

    let formData = reactive({
        id: '' as string | number,
        title: '',
        slug: '',
        status: false,
        image: '',
        description: '',
        expire_date: null as Date | string | null,
        questions: [] as Question[],
        user: {} as User
    });

    /* 
        Image Preview
    */
    const imagePreview = (event: any) => {
        const file = event.target.files[0];

        const reader  = new FileReader();
        reader.onload = () => {
            image_url.value = reader.result;
            formData.image  = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    const questionChange = (question:any) => {

        console.log('question chage', question);
    }

    const addQuestion = (index: number) => {
        const newQuestion: Question = {
            id: uuidv4(),
            type: 'text',
            question: '',
            description: '',
            data: {}
        }
        formData.questions.splice(index, 0, newQuestion);
    }

    const deleteQuestion = (question: Question) => {
        const questionIndex = formData.questions.findIndex(q =>q.id === question.id);
        if ( questionIndex !== undefined && questionIndex !== -1 ) { 
        formData.questions.splice(questionIndex,1);
        }
    }
    
    
    const getSurvey = async (surveyId: string) => {
        try {
            isLoading.value = true;
            const response = await ajaxObj.get(`survey/${surveyId}`);
            isLoading.value = false;
            
            if ( 200 === response.status ) {
                const survey         = response.data.data;
                updateFormData(survey);
            }
        } catch ( error: any ) {
            isLoading.value = false;
            if (error && error.response && 422 === error.response.status) {
                const formKeys = Object.keys(formData);
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

    if(route.params.id) {
        getSurvey(route.params.id as string); 
    }


    const saveSurvey = async () => {
        try {
            if ( route.params.id ) {
                // Update code goes here
                isLoading.value = true;
                const response = await ajaxObj.put(`survey/${route.params.id}`, formData);
                isLoading.value = false;
                if ( 200 === response.status ) {

                    const survey         = response.data.data;
                    updateFormData(survey);
                    
                    toast.success("Survey has been updated successfully");
                    router.push({name: 'surveyView', params: { id: response.data.data.id } });
                } else {
                    toast.error("Something went wrong!");
                }
            } else {
                formData.user = userStoreObj.getUser();
                isLoading.value = true;
                const response = await ajaxObj.post('survey', formData);
                isLoading.value = false;
                if ( 201 === response.status ) {
                    toast.success("Survey has been created successfully");
                    router.push({name: 'surveyView', params: { id: response.data.data.id } });
                } else {
                    toast.error("Something went wrong!");
                }
            }
        } catch (error: any) {
            isLoading.value = false;
            if (error && error.response && 422 === error.response.status) {
                const formKeys = Object.keys(formData);
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

    const updateFormData = ( survey: Survey ): void => {
        formData.id          = survey.id; 
        formData.title       = survey.title;
        formData.slug        = survey.slug;
        formData.status      = survey.status;
        image_url.value      = survey.image_url ?? '';
        formData.description = survey.description;
        formData.expire_date = survey.expire_date ?? null;
        formData.questions   = survey.questions ?? [];
    }
</script>