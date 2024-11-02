<template>
    <PageComponent>
        <template v-slot:header>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    Dashboard 
                </h1>
            </div>
        </header>
       </template>
    </PageComponent>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import PageComponent from '../components/PageComponent.vue';
    import ajax from '../store/ajax';
    import { userStore } from '../store/user';
    
    const ajaxObj = new ajax();
    const userStoreObj = userStore();

    const loadData = async() => {
        let data = {
            user: userStoreObj.getUser()
        };
        const response = await ajaxObj.post('dashboard', data);
        console.log('dashboard response', response);
    }

    onMounted(() => {
        loadData();
    });

</script>