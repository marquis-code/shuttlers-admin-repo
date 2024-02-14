<template>
	<div class="w-full gap-4 flex flex-col">
		<div class="relative w-full">
			<input v-model.trim="search" type="text" placeholder="Search users" class="input-field " @keyup.enter.prevent="getUsersList()">

			<div class="absolute top-1.5 right-3 w-auto">
				<div class="flex w-full items-center gap-2.5">
					<span class="text-sm w-32">
						Filter by:
					</span>
					<select v-model="sortDirection" class="px-3 py-2 border text-xs rounded-lg outline-none w-full">
						<option value="all" class="text-xs">
							All
						</option>
						<option value="company" class="text-xs">
							Company
						</option>
					</select>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-lg">
			<div v-if="sortDirection === 'all'" class="flex items-center justify-end pt-6 pb-6 pr-6 border-b gap-x-3">
				<p class="text-sm text-green-500">
					select all users
				</p>
				<input id="notify-all" v-model="credentials.notifyAll.value" type="checkbox" class="form-checkbox rounded-full text-green7" @change="handleAllUsersSelection($event)">
			</div>
			<div v-if="sortDirection === 'company'" class="flex items-center justify-between  pt-6 pb-6 px-10 border-b gap-x-3 w-full">
				<div class="w-4/12">
					<label for="corporates" class="block mb-2 text-sm">Select Company {{ corporateId }}</label>
				</div>
				<div class="w-8/12">
					<select id="companies" v-model="corporateId" class="outline-none bg-gray-50 w-full border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  placeholder-gray-400 text-gray-900">
						<option v-for="(item, index) in corporatesList" :key="index" :value="item.id">
							{{ item.corporate_name }}
						</option>
					</select>
				</div>
			</div>
			<Skeleton v-if="loading" height="119px" />

			<div v-else-if="showTable" class="px-10 pb-10 h-96 overflow-y-auto">
				<div v-for="(item, index) in usersList" :key="index" class="flex items-center justify-between py-6 border-b">
					<div class="flex items-center gap-x-3">
						<Avatar :name="item.fname" bg="#B1C2D9" />
						<div>
							<p class="text-sm font-medium">
								{{ item.email }}
							</p>
							<p class="text-sm">
								{{ item.phone }}
							</p>
						</div>
					</div>
					<div>
						<input :id="item.email" v-model="selectedUsers" :checked="notificationType === 'all'" :disabled="sortDirection === 'company' || notificationType === 'all'" type="checkbox" :value="item" class="form-checkbox rounded-full text-green7">
					</div>
				</div>
			</div>
			<div v-else class="flex items-center justify-center py-10">
				<p class="text-sm text-gray-400">
					Select a company
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { useCreateNotification } from '@/composables/modules/users/notification'
import { useGetUsersList, useGetUserByCorporateId } from '@/composables/modules/users/fetch'
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'

const { getCorporatesList, loading: loadingCorporateList, corporatesList, page_size: corporate_page_size } = useGetCorporateList()
const { getCorporatesByIdList, corporateUsersList } = useGetUserByCorporateId()
const { getUsersList, loading, usersList, filterData, page_size } = useGetUsersList()

corporate_page_size.value = 10000
getCorporatesList()
getUsersList()

const users = ref([])
const { selectedUsers, search, credentials, notificationType, corporateId } = useCreateNotification()
const sortDirection = ref('all')

const handleAllUsersSelection = (e) => {
	nextTick(() => {
		if (e.target.checked) {
			notificationType.value = 'all'
			selectedUsers.value.length = users.value.length
		} else {
			notificationType.value = 'regular'
			selectedUsers.value = []
			users.value = []
		}
	})
}

watchDebounced(search, () => {
	filterData.search.value = search.value
	getUsersList()
}, { debounce: 500 })

watchDebounced(corporateId, async () => {
	filterData.corporate_id.value = corporateId.value
	filterData.is_corporate.value = 1
	page_size.value = 10000
	await getUsersList()
})

watch(sortDirection, () => {
	if (sortDirection.value === 'all') {
		page_size.value = 10
		filterData.is_corporate.value = 0
		filterData.corporate_id.value = ''
		corporateId.value = ''
		getUsersList()
	}

	if (sortDirection.value === 'company') {
		getCorporatesByIdList(corporateId.value).then(() => {
			usersList.value = corporateUsersList.value
		})
	}
})

const showTable = computed(() => {
	if (sortDirection.value === 'all') return true
	else if (sortDirection.value === 'company' && corporateId.value) return true
	else return false
})

</script>

<style scoped></style>
