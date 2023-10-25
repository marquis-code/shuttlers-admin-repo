<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Staff
				</p>
			</div>
			<hr>
			<div class="space-y-6 p-6 mt-5">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="firstName" class="label"
						>First name</label
						>
						<input
							type="text"
							name="firstName"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="lastName" class="label"
						>Last name</label
						>
						<input
							type="text"
							name="lastName"
							class="input-field"
						>
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="emailAddress" class="label"
						>Email address</label
						>
						<input
							type="email"
							name="emailAddress"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="phone" class="label"
						>Phone</label
						>
						<input
							type="tel"
							name="phone"
							class="input-field"
						>
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="password" class="label"
						>Password
						</label>
						<input
							type="password"
							name="password"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="phone" class="label"
						>Staff Role</label
						>
						<select class="input-field">
							<option value="superAdmin">
								Super Admin
							</option>
							<option value="admin">
								Admin
							</option>
							<option value="user">
								User
							</option>
						</select>
					</div>
				</div>

				<div>
					<button class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Add Staff
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
