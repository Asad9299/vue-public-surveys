import { defineStore } from "pinia";
import ajax from "./ajax";
import { ref } from "vue";

export type Survey = {
    id: number,
    title: string,
    slug: string,
    status: string,
    image?: string,
    description: string,
    created_at: Date | string,
    updated_at?: Date | string,
    expire_date?: Date | string,
    questions?: Question[]
}

export type Question = {
    id: number | string,
    type: string,
    question: string,
    description?: string | null,
    data?: QuestionData | null 
}

export type QuestionData = {
    multiple?: boolean,
    options?: Option[] 
}

export type Option = {
    uuid: string,
    text: string
}

export const surveyStore = defineStore('survey', () => {
    const surveys = ref<Survey[]>([]);

    const questionTypes = ['text', 'select', 'radio', 'checkbox', 'textarea'];

    const isLoading = ref(true);

    const surveyList = async () => {
        try {
            const ajaxObj = new ajax();
            const response = await ajaxObj.get('survey');
            surveys.value = response.data.data;
        } catch ( error: any ) {
            console.error("Failed to fetch surveys:", error);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        surveys,
        questionTypes,
        surveyList,
        isLoading
    }
});