<template>
	<div class="w-full gap-4 flex flex-col">
		<div class="relative w-full">
			<input
				v-model.trim="search" type="text" placeholder="Search partners" class="input-field " @keyup.enter.prevent="getPartnersList()">
		</div>
		<div class="bg-white rounded-lg">
			<div v-if="itemSelected === 'all'" class="flex items-center justify-end pt-6 pb-6 pr-6 border-b gap-x-3">
				<p class="text-sm text-green-500">
					select all partners
				</p>
				<input id="notify-all" v-model="credentials.notifyAll.value" type="checkbox" class="form-checkbox rounded-full text-green7" @change="handleAllPartnersSelection($event)">
			</div>

			<Skeleton v-if="loading" height="119px" />
			<div v-else class="px-10 pb-10 h-96 overflow-y-auto">
				<div v-for="(item, index) in updatedPartnersList" :key="index" class="flex items-center justify-between py-6 border-b">
					<div class="flex items-center gap-x-3">
						<Avatar :name="item.fname" bg="#B1C2D9" />
						<div>
							<p class="text-sm font-medium">
								{{ item.owner?.email }}
							</p>
							<p class="text-sm">
								{{ item.company_phone }}
							</p>
						</div>
					</div>
					<div>
						<input :id="item.email" v-model="selectedPartners" type="checkbox" :value="item" class="form-checkbox rounded-full text-green7">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCreateNotification } from '@/composables/modules/partners/notification'

import { useGetPartnersList } from '@/composables/modules/partners/fetch'

const { getPartnersList, loading, partnersList, onFilterUpdate, moveTo, total, page, next, prev } = useGetPartnersList()

getPartnersList()

const partners = ref([])

const updatedPartnersList = computed(() => {
	return partnersList.value
})

const { selectedPartners, search, credentials, notificationType } = useCreateNotification()
const corporateId = ref('')
const itemSelected = ref('all')

	const handleAllPartnersSelection = (e) => {
      nextTick(() => {
        if (e.target.checked) {
          notificationType.value = 'all'
          selectedPartners.value.length = partners.value.length
        } else {
          notificationType.value = 'regular'
          selectedPartners.value = []
		  partners.value = []
        }
      })
	}

	watch(search, (olvVal, newVal) => {
		onFilterUpdate({ type: 'search', value: search.value })
	})

</script>

<style scoped>

</style>
