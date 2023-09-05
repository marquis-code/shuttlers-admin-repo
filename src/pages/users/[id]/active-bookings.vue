<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="activeBookingsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route">
					<span class="text-blue-600">{{ item?.data?.route?.route_code }}</span>
				</div>

				<div v-if="item.route_code">
					<span class="text-blue-600">{{ item?.data?.route?.route_code }}</span>
				</div>

				<div v-if="item.status">
					<span class="text-white text-xs px-2.5 py-2 rounded-lg font-medium" :class="[item.data.status === 'accepted' ? 'bg-green-500' : item.data.status === 'pending' ? 'bg-yellow-600' : item.data.status === 'cancelled' ? 'bg-gray-400' : '']">{{ item.data.status }}</span>
				</div>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useUserActiveBookings } from '@/composables/modules/users/active-bookings'
const { activeBookingsList, loading, getUserActiveBookingsById } = useUserActiveBookings()
const id = useRoute().params.id as string
getUserActiveBookingsById(id)

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
        text: 'END DATE',
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
