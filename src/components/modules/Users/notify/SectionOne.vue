<template>
	<form class="w-full gap-4 flex flex-col" @submit.prevent="sendNotification">
		<div class="w-full">
			<input v-model="credentials.title.value" type="text" placeholder="Enter notification title" class="input-field">
		</div>
		<div class="w-full bg-white rounded-lg">
			<div class="flex items-center justify-between py-3 pr-6 border-b">
				<div>
					<input v-model="search" type="text" placeholder="Add users" class="pl-4 bg-white outline-none">
				</div>
				<p v-if="selectedCompany?.id && !loading_users" class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium whitespace-nowrap">
					All<span class="underline mx-2">{{ selectedCompany?.corporate_name }} ({{ users.length }})</span>users selected
				</p>
				<p v-if="!credentials.notifyAll.value && !selectedCompany?.id" class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
					{{ selectedUsers.length }} user{{ selectedUsers.length > 0 ? 's' : '' }} selected
				</p>
				<p v-if="credentials.notifyAll.value" class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
					All users selected
				</p>
			</div>
			<div class="p-1">
				<div v-if="selectedUsers.length > 0 && !selectedCompany?.id" class="flex flex-wrap gap-4 p-2">
					<div
						v-for="user in selectedUsers"
						:key="user.id"
						class="border rounded-lg text-xs flex justify-start gap-1 items-center py-2 px-2"
					>
						<p class="text-white rounded-full text-xs bg-green-500 text-[10px] px-1 py-1">
							{{ user?.fname?.slice?.(0, 1).toUpperCase() }}{{ user?.lname?.slice?.(0, 1).toUpperCase() }}
						</p>

						<p class="pl-3 text-xs">
							{{ user?.fname }}{{ user?.lname }}
						</p>
						<Icon name="close" class="w-5 ml-auto cursor-pointer" @click="removeSelectedUser(user)" />
					</div>
				</div>
			</div>
			<div class="p-6">
				<ClientOnly>
					<QuillEditor v-model:content="credentials.description.value" content="html" content-type="html" :edit="true" theme="snow" placeholder="Enter notification description" />
				</ClientOnly>
			</div>
			<div class="flex flex-col gap-4 px-6 pb-6">
				<ToggleButton v-model="credentials.sms.value" name="sms" label="Enable SMS notification" />

				<ToggleButton v-model="credentials.email.value" name="email" label="Enable Email notification" />

				<!-- <button :disabled="!isFormEmpty" class="btn-primary mt-4" type="submit">
					{{ creatingNotification ? 'Processing...' : 'Notify users' }}
				</button> -->
				<button :disabled="!isButtonEnable" class="bg-black disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-lg py-3 w-full">
					{{ creatingNotification ? 'Processing...' : 'Notify users' }}
				</button>
			</div>
		</div>
	</form>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import { useCreateNotification } from '@/composables/modules/users/notification'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
import { useGetUsersList } from '@/composables/modules/users/fetch'
import { useUserNotifyFilter } from '@/composables/modules/users/notify-filter'

const { selectedCompany, loading_users, users, type } = useUserNotifyFilter()
const { sendNotification, creatingNotification, credentials, removeSelectedUser, selectedUsers, search } = useCreateNotification()
const { corporatesList, page_size: corporate_page_size } = useGetCorporateList()
// const { usersList, loading } = useGetUsersList()

const isButtonEnable = computed(() => {
	if (!credentials.title.value) return false
	if (!credentials.description.value) return false
	if (type.value === 'all' && credentials.notifyAll.value) return true
	if (type.value === 'all' && (!selectedUsers.value.length)) return false
	if (type.value === 'company' && !users.value.length) return false
	return true
})
</script>
