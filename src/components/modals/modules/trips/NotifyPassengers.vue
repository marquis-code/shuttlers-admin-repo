<template>
	<Modal
		modal="$atts.modal"
		title="Notify (In-App notifications)"
		:no-close-btn="true"
	>
		<form @submit.prevent="handleNotification">
			<div class="space-y-6">
				<div class="field relative">
					<label for="title" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Message Title</label>
					<input id="title" v-model="form.title" placeholder="Enter notification title" type="text" class="input-field" required>
				</div>
				<div class="field relative">
					<label for="description" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Message Description</label>
					<textarea id="description" v-model="form.description" rows="4" cols="4" placeholder="Describe Notification" class="input-field resize-none" required />
				</div>
				<div>
					<div class="flex items-center gap-x-2">
						<input v-model="form.sms" type="checkbox"><label class="text-sm pt-2">SMS Notifications</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input v-model="form.email" type="checkbox"><label class="text-sm pt-2">Email Notifications</label>
					</div>
				</div>
			</div>
			<div class="flex justify-between items-center gap-x-6 pt-6">
				<div class="w-full">
					<button class="text-white bg-gray-500 w-full rounded-md py-2.5" @click="useTripsModal().closeNotifyPassengers()">
						Close
					</button>
				</div>
				<div class="w-full">
					<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005]">
						<span v-if="!loading" class="flex justify-center items-center gap-2.5">Proceed</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useNotifyPassenger } from '@/composables/modules/trips/passengers'
import { useTripsModal } from '@/composables/core/modals'
const { notifyPassenger, loading, populateNotificationForm, busstopUsersIds } = useNotifyPassenger()
const isFormEmpty = computed(() => {
	return !!(form.title && form.description)
})

const form = reactive({
    sms: '',
    email: '',
    title: '',
    description: ''
})

const handleNotification = () => {
	// const ids = ref([]) as any
	// ids.value.push(selectedUser?.value?.user_id)
	const payload = {
		user_ids: busstopUsersIds.value,
		title: form.title,
		body: form.description,
		sms: form.sms,
		email: form.email
	}
	populateNotificationForm(payload)
	notifyPassenger()
}
</script>

<style>

</style>
