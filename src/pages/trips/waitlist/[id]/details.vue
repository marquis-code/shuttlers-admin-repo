<template>
	<main class="">
		<Table
			:loading="loading"
			:headers="computedTableFields"
			:table-data="selectedWaitlist"
		>
			<template #header>
				<TableFilter :filter-type="{ showSearchBar: true }" @filter="onFilterUpdate" />
				<div class="bg-white border-x border-gray-200">
					<div class="flex justify-end items-end pr-3 pb-2">
						<div class="flex items-center gap-x-2">
							<p class="font-medium text-sm">
								Filter:
							</p>
							<select
								v-model="filterData.routeCode.value"
								class="outline-none px-3 text-sm font-medium py-3 rounded-md border pr-6"
							>
								<option value="" disabled>
									Filter by
								</option>
								<option value="">
									All
								</option>
								<option
									v-for="itm in computedRouteCodeList"
									:key="itm"
									:value="itm"
								>
									{{ itm }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div v-if="filterData.routeCode.value">
					<div
						v-for="(itm, idx) in removeDuplicates(modifiedArray)"
						:key="idx"
						class="flex justify-between items-center py-3 px-3 bg-gray-200"
					>
						<div class="text-gray-800 font-medium flex items-center gap-x-3">
							<div>{{ itm?.routeCode }}</div>
							<div v-if="Object.keys(routeDetailsInfo).length">
								{{ routeDetailsInfo?.availableSeats }} seat available
							</div>
						</div>
						<button
							class="text-white bg-black font-medium border-gray-800 px-4 text-sm py-2.5 rounded-md"
							@click="handleWaitlistItinerary(itm)"
						>
							<span v-if="!loadingItinerary" class="text-sm">{{
								itm?.itenery
							}}</span>
							<Spinner v-else />
						</button>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<NuxtLink
					v-if="item.fname"
					:to="`/users/${item?.data?.userId}/user-info`"
					class="flex items-center gap-x-3"
				>
					<Avatar :name="item?.data?.fname" bg="#B1C2D9" />
					<div>{{ item?.data?.fname }} {{ item?.data?.lname }}</div>
				</NuxtLink>
				<div
					v-if="item.status"
				>
					<button :disabled="routeDetailsInfo?.availableSeats == 0" :class="[
						item?.data?.status === 'booked'
							? 'bg-gray-500 text-white'
							: item?.data?.status === 'pending'
								? 'bg-shuttlersGreen text-white'
								: '',
					]" class="rounded-lg px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-25" @click="handleUserNotification(item.data)">
						{{
							item?.data?.status === "pending" ? "Notify" : item?.data?.status
						}}
					</button>
				</div>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="waitlistMoveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useNotifyWaitlistUser } from '@/composables/modules/waitlist/notifyWaitlistUser'
import {
  useWaitlistIdDetails,
  useWaitlistByItinerary
} from '@/composables/modules/waitlist/id'
import useRemoveDuplicates from '@/composables/core/useRemoveDuplicates'
const { selectedWaitlist, loading, getWaitlistById, filterData, onFilterUpdate, next, prev, moveTo: waitlistMoveTo, total, page } =
  useWaitlistIdDetails()
  const { notifyWaitlistUser, processing } = useNotifyWaitlistUser()
const {
  loading: loadingItinerary,
  getWaitlistByItineraryId,
  moveTo,
  setRequestData,
  itineraryWaitlistList,
  routeDetailsInfo
} = useWaitlistByItinerary()
const { removeDuplicates } = useRemoveDuplicates()
getWaitlistById()

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

const computedRouteCodeList = computed(() => {
  return Array.from(
    new Set(selectedWaitlist.value.map((item) => item.routeCode))
  )
})
const propertiesToKeep = ['routeCode', 'itenery']
const modifiedArray = computed(() => {
  return selectedWaitlist.value.map((obj) => {
    const selectedObj = {}
    propertiesToKeep.forEach((prop) => {
      if (obj.hasOwnProperty(prop)) {
        selectedObj[prop] = obj[prop]
      }
    })
    return selectedObj
  })
})
const tableFields = ref([
  {
    text: 'Route',
    value: 'routeCode'
  },
  {
    text: 'Time',
    value: 'itenery'
  },
  {
    text: 'Name',
    value: 'fname'
  },
  {
    text: 'Phone Number',
    value: 'phone'
  },
  {
    text: 'Email Address',
    value: 'email'
  },
  {
    text: 'Bus Stop',
    value: 'pickup'
  }
])

const computedTableFields = computed(() => {
  if (Object.keys(routeDetailsInfo.value).length) {
    return [
      ...tableFields.value,
      {
        text: 'Actions',
        value: 'status'
      }
    ]
  } else {
    return tableFields.value
  }
})

const handleWaitlistItinerary = (itm) => {
  const payload = {
    routeCode: itm.routeCode,
    itenery: itm.itenery
  }
  setRequestData(payload)
  getWaitlistByItineraryId()
}

const handleUserNotification = (itm) => {
    useConfirmationModal().openAlert({
        title: 'Notify user of seat availability',
		type: 'NORMAL',
        desc: 'Proceed to notify user of seat availability',
		loading: processing,
		call_function: () => notifyWaitlistUser(itm.id)
    })
}
</script>
