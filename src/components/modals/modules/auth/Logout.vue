<template>
	<Modal
		modal="$atts.modal"
		title=""
		:no-close-btn="false"
		class="text-center"
	>
		<div class="flex flex-col items-center justify-center">
			<icon name="warning" class="w-24 mb-9" />
			<h1 class="text-2xl font-bold">
				Logout
			</h1>

			<p class="mt-2 text-gray-400">
				Are you sure you want to logout?
			</p>

			<div class="flex flex-col w-full gap-4 mt-4">
				<button class="w-full modal-btn border-red bg-red text-light hover:bg-red" @click="logOut">
					Logout
				</button>
				<button class="w-full  modal-btn " @click="useAuthModal().closeLogout()">
					Cancel
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useUser } from '@/composables/auth/user'
const { logOut } = useUser()

</script>

<style>

</style>
