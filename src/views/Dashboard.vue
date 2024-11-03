<template>
    <PageComponent>
        
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <PulseLoader />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
            <!-- Total Surveys -->
            <div class="bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down order-1 lg:order-2" style="animation-delay: 0.1s">
                <h3 class="text-2xl font-semibold">Total Surveys</h3>
                <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                    {{ dashboardData.totalSurveys }}
                </div>
            </div>

            <!-- Total Answers -->
            <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down" style="animation-delay: 0.2s">
                <h3 class="text-2xl font-semibold">Total Answers</h3>
                <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                    {{ dashboardData.totalAnswers }}
                </div>
            </div>

            <div class="row-span-2 animate-fade-in-down order-3 lg:order-1 bg-white shadow-md p-4">
            <h3 class="text-2xl font-semibold">Latest Survey</h3>
                <div v-if="dashboardData.latestSurvey">
                    <img
                        :src="dashboardData.latestSurvey.image_url"
                        class="w-[240px] mx-auto"
                        alt=""
                    />
                    <h3 class="font-bold text-xl mb-3">
                        {{ dashboardData.latestSurvey.title }}
                    </h3>
                    <div class="flex justify-between text-sm mb-1">
                        <div>Create Date:</div>
                        <div>
                            {{ dashboardData.latestSurvey.created_at }}
                        </div>
                    </div>
                    <div class="flex justify-between text-sm mb-1">
                        <div>Expire Date:</div>
                        <div>
                            {{ dashboardData.latestSurvey.expire_date }}
                        </div>
                    </div>
                
                    <div class="flex justify-between text-sm mb-1">
                        <div>Status:</div>
                        <div>
                            {{ dashboardData.latestSurvey.status ? "Active" : "Draft" }}
                        </div>
                    </div>
                
                    <div class="flex justify-between text-sm mb-1">
                        <div>Questions:</div>
                        <div>
                            {{ dashboardData.latestSurvey.questions }}
                        </div>
                    </div>
                
                    <div class="flex justify-between text-sm mb-3">
                        <div>Answers:</div>
                        <div>
                            {{ dashboardData.latestSurvey.answers }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <router-link
                        :to="{ name: 'surveyView', params: { id: dashboardData.latestSurvey.id } }"
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                        Edit Survey
                        </router-link>
                    </div>
                </div>
                <div v-else class="text-gray-600 text-center py-16">
                    Your don't have surveys yet
                </div>
            </div>

            <!-- Latest Answers -->
            <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down" style="animation-delay: 0.3s">
                <div class="flex justify-between items-center mb-3 px-2">
                    <h3 class="text-2xl font-semibold">Latest Answers</h3>
                </div>

                <div v-if="dashboardData.latestAnswers">
                    <a href="javascript:void(0)" v-for="answer of dashboardData.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
                        <div class="font-semibold">
                            {{ answer.survey.title }}
                        </div>
                        <small>
                            Answer Made at:
                            <i class="font-semibold">
                                {{ answer.end_date }}
                            </i>
                        </small>
                    </a>
                </div>
                <div v-else class="text-gray-600 text-center py-16">
                    Your don't have answers yet
                </div>
            </div>
      </div>
    </PageComponent>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import PageComponent from '../components/PageComponent.vue';
    import ajax from '../store/ajax';
    import { userStore } from '../store/user';
    // @ts-ignore
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import { type Answer, type Survey } from '../store/survey';

    const ajaxObj = new ajax();
    const userStoreObj = userStore();

    const dashboardData = ref({
        totalSurveys: 0,
        totalAnswers: 0,
        latestSurvey: {} as Survey,
        latestAnswers: {} as Answer
    });

    const isLoading = ref(true);

    const loadData = async() => {
        let data = {
            user: userStoreObj.getUser()
        };
        const response = await ajaxObj.post('dashboard', data);
        dashboardData.value = response.data;
        isLoading.value = false;
    }

    onMounted(() => {
        loadData();
    });

</script>