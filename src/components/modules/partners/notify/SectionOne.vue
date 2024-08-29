<template>
	<form class="w-full gap-4 flex flex-col" @submit.prevent="showPreview">
		<div class="w-full">
			<input v-model="credentials.title.value" type="text" placeholder="Enter notification title" class="input-field">
		</div>
		<div class="w-full bg-white rounded-lg">
			<div class="flex items-center justify-end py-3 pr-6 border-b">
				<!-- <div>
					<input v-model="search" type="text" placeholder="Add partners" class="pl-4 bg-white outline-none">
				</div> -->
				<p v-if="notificationType === 'regular'" class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
					{{ selectedPartners.length }} partner{{ selectedPartners.length > 0 ? 's' : '' }} selected
				</p>
				<p v-else class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
					All partners selected
				</p>
			</div>
			<div class="p-1">
				<div v-if="selectedPartners.length > 0" class="grid grid-cols-3 gap-4 p-2">
					<div
						v-for="partner in selectedPartners"
						:key="partner.id"
						class="border rounded-lg text-xs flex justify-start gap-1 items-center py-2 px-2"
					>
						<Avatar :name="partner?.company_name" :size="24" />

						<p class="pl-3 text-xs">
							{{ partner?.company_name }}
						</p>
						<Icon name="close" class="w-5 ml-auto cursor-pointer" @click="removeSelectedPartner(partner)" />
					</div>
				</div>
			</div>
			<div class="p-6">
				<ClientOnly>
					<QuillEditor v-model:content="credentials.description.value" :edit="true" content-type="html" theme="snow" placeholder="Enter notification description" />
				</ClientOnly>
			</div>
			<div class="flex flex-col gap-4 px-6 pb-6">
				<ToggleButton v-model="credentials.sms.value" name="sms" label="Enable SMS notification" />

				<ToggleButton v-model="credentials.email.value" name="email" label="Enable Email notification" />

				<button :disabled="!isFormEmpty" class="btn-primary mt-4" type="submit">
					{{ creatingNotification ? 'Processing...' : 'Notify partners' }}
				</button>
			</div>
		</div>
	</form>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import { useCreateNotification } from '@/composables/modules/partners/notification'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { sendNotification, creatingNotification, message, credentials, isFormEmpty, notificationType, removeSelectedPartner, selectedPartners, search, showPreview } = useCreateNotification()

</script>

<style scoped>

</style>
