<template>
	<Modal
		modal="$atts.modal"
		title=""
		:no-close-btn="false"
		class="text-center"
	>
		<div class="flex flex-col justify-center items-center">
			<icon name="warning" class="w-24 mb-9" />
			<h1 class="font-bold text-2xl">
				Logout
			</h1>

			<p class="text-grey4 mt-2">
				Are you sure you want to logout?
			</p>

			<div class="flex flex-col w-full">
				<button class="modal-btn border-red bg-red text-light hover:bg-red w-full" @click="logOut">
					Logout
				</button>
				<button class="modal-btn text-dark mt-3 w-full" @click="useAuthModal().closeLogout()">
					Cancel
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useUser } from '@/composables/user/index'
import Modal from '@/components/core/modal/Modal.vue'

const { logOut } = useUser()

</script>

<style>

</style>
