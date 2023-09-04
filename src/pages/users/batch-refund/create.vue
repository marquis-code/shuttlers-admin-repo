<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<form class="bg-white rounded-md border w-11/12 lg:w-[567px] p-8 flex flex-col gap-6">
			<header class="flex flex-col gap-2 mb-3">
				<h1 class="text-2xl font-bold">
					Log Refund
				</h1>
				<p class="text-grey6">
					Kindly input the correct informations
				</p>
			</header>
			<div class="field relative">
				<label for="email">Select users</label>
				<input id="user" autocomplete="true" type="email" class="input-field" required>
			</div>

			<div class="field relative">
				<label for="trip">Select past trip</label>
				<input id="trip" autocomplete="true" type="email" class="input-field" required>
			</div>

			<div class="field relative">
				<label for="percentage">Refund percentage</label>
				<input id="percentage" autocomplete="true" type="email" class="input-field" required>
			</div>

			<div class="field relative">
				<label for="Reason">Reason</label>
				<textarea id="Reason" autocomplete="true" type="email" class="input-field" required />
			</div>

			<div class="flex justify-end">
				<button class="btn-primary" disabled>
					Log refund
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
const router = useRouter()

const form = ref({
	bookingDate: ''
})
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped></style>
