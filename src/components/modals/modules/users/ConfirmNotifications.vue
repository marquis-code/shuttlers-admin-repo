<template>
	<Modal
		modal="$atts.modal"
		title=""
		modal-class="!w-[740px] min-h-[640px]"
		:no-close-btn="true"
	>
		<section class="flex flex-col justify-between h-full w-full">
			<section class="flex gap-4 h-[480px] w-full">
				<div class="bg-grey p-4 h-full border w-1/2 flex flex-col gap-6">
					<h2 class="font-bold text-sm flex gap-3 items-center">
						<Icon name="logo" class="w-6" />
						<span v-html=" credentials.title.value" />
					</h2>
					<p class="font-medium text-sm" v-html="credentials.description.value" />
				</div>

				<div class="p-4 h-full  w-1/2 flex flex-col gap-4">
					<Icon class="w-12" name="mobile" />
					<h2 class="font-bold text-sm">
						Preview notification
					</h2>
					<p class="font-medium">
						Please confirm if this is the message you want to send to the users.
					</p>

					<div class="flex w-full justify-between text-sm pb-5 border-b mt-8">
						<span class="fd">Users</span>
						<span class="font-bold">{{ credentials.notifyAll.value ? 'All users' : selectedUsers.length }} Selected</span>
					</div>
					<div class="flex w-full justify-between text-sm">
						<span class="fd">Channels</span>
						<span class="font-bold capitalize">In-app {{ credentials.sms.value ? 'SMS' : '' }} {{ credentials.email.value ? 'Email' : '' }} </span>
					</div>
				</div>
			</section>
			<footer class="flex justify-end mt-auto gap-4">
				<button class="btn-secondary" :disabled="creatingNotification" @click="useUserModal().closeConfirmNotifications()">
					Go Back
				</button>
				<button class="btn-primary" :disabled="creatingNotification" @click="createNotifications">
					<span v-if="!creatingNotification" class="flex justify-center items-center gap-2.5">
						Send notification
					</span>
					<Spinner v-else />
				</button>
			</footer>
		</section>
	</Modal>
</template>

<script setup lang="ts">
import { useUserModal } from '@/composables/core/modals'
import { useCreateNotification } from '@/composables/modules/users/notification'

const { createNotifications, creatingNotification, credentials, selectedUsers } = useCreateNotification()

</script>

<style>

</style>
