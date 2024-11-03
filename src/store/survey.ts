import { defineStore } from "pinia";
import ajax from "./ajax";
import { ref } from "vue";

export type Survey = {
    id: number | string,
    title: string,
    slug: string,
    status: boolean,
    image?: string,
    description: string,
    created_at: Date | string,
    updated_at?: Date | string,
    expire_date?: Date | string,
    questions?: Question[],
    image_url?: string,
    answers?: any,
}

export type Question = {
    id: number | string,
    type: string,
    question: string,
    description?: string | null,
    data?: QuestionData | null 
}

export type Answer = {
    id: any
    answer?: any
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

    const paginateLinks:any = ref({});

    const surveyList = async (link:any = {}) => {
        try {
            isLoading.value = true;
            const ajaxObj = new ajax();
            let reqURL = 'survey';
            if ( link.url ) {
                const url = new URL(link.url);
                reqURL = `survey${url.search}`; 
            }
            const response = await ajaxObj.get(reqURL);
            surveys.value = response.data.data;
            paginateLinks.value = response.data.meta;
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
        isLoading,
        paginateLinks
    }
});