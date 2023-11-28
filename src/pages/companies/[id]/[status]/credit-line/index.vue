<template>
	<main class="">
		<div class="flex justify-center items-center flex-col space-y-3 mt-20">
			<h1 class="font-medium text-sm">
				This company currently doesn't have any employee credit line system. Create one below
			</h1>
			<NuxtLink :to="`/companies/${id}/${status}/credit-line/create`" class="bg-gray-700 text-white px-6 text-sm py-3 rounded-md">
				Create Employee Create System
			</NuxtLink>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useCorporateCreditSystem } from '@/composables/modules/corporates/id'
const { corporateCreditSystem, loading, getCorporateCreditSystem } = useCorporateCreditSystem()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
getCorporateCreditSystem()
const id = useRoute().params.id
const status = useRoute().params.status
</script>

<style scoped></style>
