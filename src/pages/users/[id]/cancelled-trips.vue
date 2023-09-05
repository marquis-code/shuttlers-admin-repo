<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="pastBookingsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.title">
					<span class="text-blue-600">{{ item.data.title }}</span>
				</div>
				<div v-if="item.firstName" class="">
					<p class="text-blue-600">
						{{ item.data.firstName }} {{ item.data.lastName }}
					</p>
					<p>{{ item.data.email }}</p>
				</div>
				<div v-if="item.location" class="flex items-center gap-x-2">
					<img src="@/assets/icons/location.svg" alt="">
					<p class="font-medium">
						{{ item.data.location }}
					</p>
				</div>
				<div v-if="item.returnTrip">
					<span>{{ item.data.returnTrip ? 'Return' : 'One-way' }}</span>
				</div>
				<div v-if="item.status">
					<span class="text-white text-xs px-2.5 py-2 rounded-lg font-medium" :class="[item.data.status === 'accepted' ? 'bg-green-500' : item.data.status === 'pending' ? 'bg-yellow-600' : item.data.status === 'cancelled' ? 'bg-gray-400' : '']">{{ item.data.status }}</span>
				</div>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useUserPastBookings } from '@/composables/modules/users/past-bookings'
const { pastBookingsList, loading, getUserPastBookingsById } = useUserPastBookings()
const id = useRoute().params.id as string
const params = ref({
	status: 'cancelled'
})
getUserPastBookingsById(id, params.value as any)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'Route Code',
        value: 'route_code'
    },
    {
        text: 'START DATE',
        value: 'start_date'
    },
    {
        text: 'DATE CANCELLED',
        value: 'end_date'
    },
    {
        text: 'Amount',
        value: 'amount'
    },
	{
        text: 'PAYMENT SOURCE',
        value: 'payment_source'
    },
    {
        text: 'ROUTE TYPE',
        value: 'route_type'
    }
])
</script>

<style scoped></style>
