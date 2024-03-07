<template>
	<div>
		<ButtonGoBack class="mb-6" />
		<ModulesUsersCreateUser v-if="!loading" :id="id" type="edit" />
		<Skeleton v-else height="400px" />
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useUserIdDetails } from '@/composables/modules/users/id'
import { useCreateUsers } from '@/composables/modules/users/create'

const { prePopulateForm } = useCreateUsers()
const { selectedUser, getUserById, loading } = useUserIdDetails()
const id = useRoute().params.id as string

if (Object.keys(selectedUser.value).length === 0) {
	getUserById(id)
}
watch(selectedUser, (val) => {
	if (Object.keys(val).length !== 0) {
		prePopulateForm(selectedUser.value)
	}
}, { immediate: true })

usePageHeader().setPageHeader({
	preTitle: 'OVERVIEW',
	title: 'Manage User'
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
