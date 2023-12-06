<template>
	<main class="flex flex-col gap-10">
		<ButtonGoBack class="!w-fit" />
		<Skeleton v-if="loading" height="300px" />
		<div v-else class="flex flex-col w-full max-w-[600px] rounded-md bg-light">
			<div class="p-4 px-6 border-b">
				<h3 class="text-base font-medium text-dark">
					Edit driver
				</h3>
			</div>
			<form class="p-4 px-6 flex flex-col gap-12" @submit.prevent="updateDriver">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="flex flex-col gap-1">
						<label class="label">First name</label>
						<input v-model.trim="fname" required type="text" class="input-field">
					</div>
					<div class="flex flex-col gap-1">
						<label class="label">Last name</label>
						<input v-model.trim="lname" required type="text" class="input-field">
					</div>
					<div class="flex flex-col gap-1">
						<label class="label">Email address</label>
						<input v-model.trim="email" required type="email" class="input-field">
					</div>
					<div class="flex flex-col gap-1">
						<label class="label">Phone</label>
						<input v-model.trim="phone" required type="number" class="input-field">
					</div>
				</div>

				<button :disabled="updating || !enableButton" class="bg-dark text-light text-sm font-medium p-2 px-4 w-fit btn-disabled rounded-md">
					{{ updating ? 'processing' : 'Update driver' }}
				</button>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUpdateDriver } from '@/composables/modules/drivers'
const { getDriverDetails, loading, updating, updateDriver, fname, lname, email, phone, enableButton } = useUpdateDriver()

getDriverDetails()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style></style>
