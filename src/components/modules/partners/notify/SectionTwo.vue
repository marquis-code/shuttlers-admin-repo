<template>
	<div class="w-full gap-4 flex flex-col">
		<div class="relative w-full">
			<input
				v-model.trim="search" type="text" placeholder="Search partners" class="input-field " @keyup.enter.prevent="getUsersList()">

			<div class="absolute top-1.5 right-3 w-auto">
				<div class="flex w-full items-center gap-2.5">
					<span class="text-sm w-32">
						Filter by:
					</span>
					<select v-model="itemSelected" class="px-3 py-2 border text-xs rounded-lg outline-none w-full">
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
			<div v-if="itemSelected === 'all'" class="flex items-center justify-end pt-6 pb-6 pr-6 border-b gap-x-3">
				<p class="text-sm text-green-500">
					select all partners
				</p>
				<input id="notify-all" v-model="credentials.notifyAll.value" type="checkbox" class="form-checkbox rounded-full text-green7" @change="handleAllUsersSelection($event)">
			</div>
			<div v-if="itemSelected === 'company'" class="flex items-center justify-between  pt-6 pb-6 px-10 border-b gap-x-3 w-full">
				<div class="w-4/12">
					<label for="corporates" class="block mb-2 text-sm">Select Company</label>
				</div>
				<div class="w-8/12">
					{{ corporateId }}
					<select id="countries" v-model="corporateId" class="outline-none bg-gray-50 w-full border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  placeholder-gray-400 text-gray-900">
						<option v-for="(item, index) in corporatesList" :key="index" :value="item.id">
							{{ item.corporate_name }}
						</option>
					</select>
				</div>
			</div>
			<Skeleton v-if="loading || loadingQueriedUsers" height="119px" />
			<div v-else class="px-10 pb-10 h-96 overflow-y-auto">
				<div v-for="(item, index) in updatedUsersList" :key="index" class="flex items-center justify-between py-6 border-b">
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
						<input :id="item.email" v-model="selectedUsers" type="checkbox" :value="item" class="form-checkbox rounded-full text-green7">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCreateNotification } from '@/composables/modules/partners/notification'

import { useGetPartnersList } from '@/composables/modules/partners/fetch'

const { getPartnersList, loading: fetchingPartners, partnersList, moveTo, total, page, next, prev } = useGetPartnersList()

getPartnersList()

const partners = ref([])

const updatedUsersList = computed(() => {
	return search.value.length ? queriedUsers.value : partnersList.value
})

const { selectedUsers, search, credentials, notificationType } = useCreateNotification()
const corporateId = ref('')
const itemSelected = ref('all')

	const handleAllUsersSelection = (e) => {
      nextTick(() => {
        if (e.target.checked) {
          notificationType.value = 'all'
          selectedUsers.value.length = partners.value.length
        } else {
          notificationType.value = 'regular'
          selectedUsers.value = []
		  partners.value = []
        }
      })
	}

	watch(search, (olvVal, newVal) => {
		queryUsers(search.value)
	})

</script>

<style scoped>

</style>
