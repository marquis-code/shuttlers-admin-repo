<template>
	<main>
		<section class="card px-0 w-6/12 space-y-4">
			<h1 class="font-bold border-b px-6 pb-4">
				Add a New Company
			</h1>
			<div class="space-y-6 px-6">
				<ModulesCorporatesCreateSteps :route-query="routeQuery" />
				<ModulesCorporatesCreateCompanyInfoForm v-if="routeQuery.tab === 'company-information'" :form="form" @next="handleNext" />
				<ModulesCorporatesCreateAdminInfoForm v-if="routeQuery.tab === 'admin-information'" :form="form" @complete="createCompany" />
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useCreateCorporate } from '@/composables/modules/corporates/create'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useConfirmationModal } from '@/composables/core/confirmation'
const { selectedCorporate } = useCorporateIdDetails()
const { loading, createCorporate, populateCorporateForm } = useCreateCorporate()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const routeQuery = computed(() => {
    return useRoute().query
})
const form = reactive({
    corporate_name: selectedCorporate.value.corporate_name,
    role: selectedCorporate.value.role,
    staff_strength: selectedCorporate.value.staff_strength,
    start_date: selectedCorporate.value.start_date,
    package_type: selectedCorporate.value.package_type,
    fname: selectedCorporate.value.fname,
    lname: selectedCorporate.value.lname,
    email: selectedCorporate.value.email,
    person_phone: selectedCorporate.value.person_phone,
    password: selectedCorporate.value.password
})

const handleNext = () => {
    navigateTo({
        path: useRoute().path,
        query: {
            tab: 'admin-information'
        }
    })
}

const createCompany = () => {
    useConfirmationModal().openAlert({
        title: 'Create a company',
        type: 'NORMAL',
        desc: 'Are you sure you want to create a company ?',
        loading,
        call_function: () => handleCreateCorporate()
})
 }

 const handleCreateCorporate = () => {
    populateCorporateForm(form)
    createCorporate()
 }
</script>
