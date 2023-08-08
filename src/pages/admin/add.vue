<template>
	<main>
		<div class="mb-6">
			<button @click="$router.go(-1)" class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2">
				Go back
			</button>
		</div>
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
						<label for="firstName"
							class="text-sm font-light text-gray                                                                             ">First
							First name</label>
						<input type="text" name="firstName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="lastName"
							class="text-sm font-light text-gray                                                                             ">First
							Last name</label>
						<input type="text" name="lastName"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="emailAddress"
							class="text-sm font-light text-gray                                                                             ">First
							Email address</label>
						<input type="email" name="emailAddress"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="phone"
							class="text-sm font-light text-gray                                                                             ">First
							Phone</label>
						<input type="tel" name="phone"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="password"
							class="text-sm font-light text-gray                                                                             ">First
							Password </label>
						<input type="password" name="password"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
					<div class="w-full">
						<label for="phone"
							class="text-sm font-light text-gray                                                                             ">First
							Staff Role</label>
						<select>
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
