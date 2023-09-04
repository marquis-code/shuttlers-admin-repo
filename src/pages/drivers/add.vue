<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="w-8/12 bg-white border rounded-md">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Driver
				</p>
			</div>
			<hr>
			<div class="p-6 mt-5 space-y-6">
				<div class="flex items-center justify-between gap-x-10">
					<div class="w-full">
						<label for="firstName"
							class="text-sm font-light text-gray ">First
							First name</label>
						<input type="text" name="firstName" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="lastName"
							class="text-sm font-light text-gray ">First
							Last name</label>
						<input type="text" name="lastName" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>
				</div>

				<div class="flex items-center justify-between gap-10">
					<div class="w-full">
						<label for="emailAddress"
							class="text-sm font-light text-gray ">First
							Email address</label>
						<input type="email" name="emailAddress" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="phone"
							class="text-sm font-light text-gray ">First
							Phone</label>
						<input type="tel" name="phone" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900">
					</div>
				</div>

				<div class="w-">
					<label for="password"
						class="text-sm font-light text-gray ">First
						Password </label>
					<input type="password" name="password" class="w-6/12 px-3 py-2 border rounded-md outline-none focus:border-gray-900">
				</div>

				<div>
					<button class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Add Driver
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style></style>
