<template>
    <!-- Question index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
        {{ props.index + 1 }} {{ props.question.question }}
        </h3>

    <div class="flex items-center">
      <!-- Add new question -->
      <button
        type="button"
        @click="addQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          mr-2
          rounded-sm
          text-white
          bg-gray-600
          hover:bg-gray-700
        "
      >
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
        Add
      </button>
      <!--/ Add new question -->

      <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          rounded-sm
          border border-transparent
          text-red-500
          hover:border-red-600
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
      </button>
      <!--/ Delete question -->
    </div>
  </div>

  <!--/ Question index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_text_' + props.question.data"
        class="block text-sm font-medium text-gray-700"
        >Question Text</label
      >
      <input
        type="text"
        :name="'question_text_' + props.question.data"
        v-model="props.question.question"
        :id="'question_text_' + props.question.data"
        class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md"
      />
    </div>
    <!--/ Question -->

    <!-- Question Type -->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700"
        >Select Question Type</label
      >

      <select
        id="question_type"
        name="question_type"
        v-model="props.question.type"
        class="
          mt-1
          block
          w-full
          py-2
          px-3
          border border-gray-300
          bg-white
          rounded-md
          shadow-sm
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
        "
      >
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
    <!--/ Question Type -->
  </div>

  <!-- Question Description -->
  <div class="mt-3 col-span-9">
    <label
      :for="'question_description_' + props.question.id"
      class="block text-sm font-medium text-gray-700"
      >Description</label
    >
    <textarea
      :name="'question_description_' + props.question.id"
      v-model="props.question.description"
      :id="'question_description_' + props.question.id"
      class="
        mt-1
        focus:ring-indigo-500 focus:border-indigo-500
        block
        w-full
        shadow-sm
        sm:text-sm
        border-gray-300
        rounded-md
      ">
    </textarea>

  </div>
  <!--/ Question Description -->

  <!-- Data -->
   <div>
      <div class="mt-2">
        <div v-if="shouldHaveOptions()" class="mt-2">
          <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
            Options

            <!-- Add new option -->
              <button
                type="button"
                @click="addOption()"
                class="
                  flex
                  items-center
                  text-xs
                  py-1
                  px-2
                  rounded-sm
                  text-white
                  bg-gray-600
                  hover:bg-gray-700
                "
              >
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
                Add Option
              </button>
            <!--/ Add new option -->
          </h4>

          <div v-if="!props.question.data?.options?.length" class="text-xs text-gray-600 text-center py-3">
            You don't have any options defined
          </div>

          <!-- Option list -->
          <div
            v-for="(option, index) in props.question.data?.options"
            :key="option.uuid"
            class="flex items-center mb-1"
          >
          <span class="w-6 text-sm"> {{ index + 1 }}. </span>
          <input
            type="text"
            tabindex="1"
            v-model="option.text"
            class="
              w-full
              rounded-sm
              py-1
              px-2
              text-xs
              border border-gray-300
              focus:border-indigo-500
            "
          />
          <!-- Delete Option -->
          <button
            type="button"
            @click="removeOption(option)"
            class="
              h-6
              w-6
              rounded-full
              flex
              items-center
              justify-center
              border border-transparent
              transition-colors
              hover:border-red-100
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!--/ Delete Option -->
        </div>
        <!--/ Option list -->
      </div>
    </div>
  </div>
  <!--/ Data -->
  <hr class="my-4" />
</template>

<script setup lang="ts">
  import { Option, Question, surveyStore } from '../../store/survey';
  import { v4 as uuidv4 } from 'uuid';

  const surveyStoreObj = surveyStore();

  const props = defineProps<{
      question: Question,
      index   : number,
  }>();

  const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

  const questionTypes = surveyStoreObj.questionTypes;

  const shouldHaveOptions = (): boolean => {
    return ["select", "radio", "checkbox"].includes(props.question.type); 
  }

  const addOption = (): void => {
    props.question.data = props.question.data ?? {};
    props.question.data.options = props.question.data.options ?? [];

    props.question.data.options.push({uuid: uuidv4(), text: ''});
    emit('change', props.question.data?.options);
  }

  const removeOption = (option: Option): void => {
    const optionIndex = props.question.data?.options?.findIndex(op =>op.uuid === option.uuid);
    
    if ( optionIndex !== undefined && optionIndex !== -1 ) { 
      props.question.data?.options?.splice(optionIndex,1);
      emit('change', props.question.data);
    }
  }

  const upperCaseFirst = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  const addQuestion = () => {
    emit('addQuestion', props.index + 1);
  }

  const deleteQuestion = () => {
    emit('deleteQuestion', props.question);
  }
</script>