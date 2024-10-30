<template>
    <fieldset class="mb-4">
        <div>
            <legend class="text-base font-medium text-gray-900">
                {{ props.index + 1 }}. {{ props.question.question }}
            </legend>
            <p class="text-gray-500 text-sm">
                {{ props.question.description }}
            </p>
        </div>

        <div class="mt-3">
            <div v-if="props.question.type === 'select'">
                <select 
                    :value="modelValue"
                    @change="emit('update:modelValue', $event.target.value)"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Please select</option>
                    <option v-for="option in props.question.data?.options" :key="option.uuid" :value="option.text">
                        {{ option.text }}
                    </option>
                </select>
            </div>

            <div v-if="props.question.type === 'radio'">
                <div
                    v-for="option of props.question.data?.options"
                    :key="option.uuid"
                    class="flex items-center">
                    <input
                        :id="option.uuid"
                        :name="'question' + question.id"
                        :value="option.text"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        @change="emit('update:modelValue', $event.target.value)"
                        />
                    <label
                        :for="option.uuid"
                        class="ml-3 block text-sm font-medium text-gray-700">
                        {{ option.text }}
                    </label>
                </div>
            </div>

            <div v-if="props.question.type === 'checkbox'">
                <div
                    v-for="option of props.question.data?.options"
                    :key="option.uuid"
                    class="flex items-center">
                    <input
                        :id="option.uuid"
                        :name="'question' + question.id"
                        v-model="model[option.text]"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        @change="onCheckboxChange"
                    />
                    <label
                        :for="option.uuid"
                        class="ml-3 block text-sm font-medium text-gray-700">
                        {{ option.text }}
                    </label>
                </div>
            </div>

            <div v-if="props.question.type === 'text'">
                <input type="text"
                    :value="modelValue"
                    @input="emit('update:modelValue', $event.target.value)"
                    class="mt-1 focus-ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div v-if="props.question.type === 'textarea'">
                <textarea
                    :value="modelValue"
                    @input="emit('update:modelValue', $event.target.value)"
                    class="mt-1 focus-ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                </textarea>
            </div>
        </div>
    </fieldset>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Question } from '../../store/survey';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    question: Question,
    index   : number,
    modelValue: any,
}>();

let model: any;

if ( props.question.type === 'checkbox') {
    model = ref({});
}

const onCheckboxChange = () => {
    const selectedOptions = [];
    for ( let text in model.value) {
        if ( model.value[text] ) {
            selectedOptions.push(text);
        }
    }
    emit('update:modelValue', selectedOptions)
}


</script>