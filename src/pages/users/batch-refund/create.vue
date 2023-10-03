<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<form class="bg-white rounded-md border w-11/12 lg:w-[567px] p-8 flex flex-col gap-6" @submit.prevent="logBatchRefund">
			<header class="flex flex-col gap-2 mb-3">
				<h1 class="text-2xl font-bold">
					Log Refund
				</h1>
				<p class="text-gray-600">
					Kindly input the correct informations
				</p>
			</header>
			<div class="field relative">
				<label for="email">Select user</label>
				<InputMultiSelectUsers v-model="selectedUser" />
			</div>

			<div class="field relative">
				<label for="trip">Select past trip</label>
				<select v-if="logRefundData.user_id.value" id="" v-model="logRefundData.trip_id.value" class="input-field">
					<option value="">
						Select trip
					</option>
					<option v-for="item in pastBookingsList" :key="item.id" :value="item.id">
						({{ item.bus_pass }})  - {{ item.trip_date }} ({{ item?.itinerary?.trip_time }}) - {{ convertToCurrency(item.itinerary.default_fare) }}
					</option>
				</select>
			</div>

			<div class="field relative">
				<label for="percentage">Refund percentage</label>

				<select id="percentage" v-model="logRefundData.refund_value.value" class="input-field" required>
					<option value="">
						Select Percentage
					</option>
					<option v-for="item in percentageArray" :key="item.value" :value="item.value">
						{{ item.name }}
					</option>
				</select>
			</div>

			<div class="field relative">
				<label for="Reason">Reason</label>
				<textarea id="Reason" v-model="logRefundData.reason.value" autocomplete="true" type="text" class="input-field" required />
			</div>

			<div class="flex justify-end">
				<button class="btn-primary" :disabled="loading">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Log refund
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { convertToCurrency } from '@/composables/utils/formatter'

import { useLogBatchRefund } from '@/composables/modules/users/batch-refund/create'

const { loading, logBatchRefund, logRefundData, pastBookingsList, selectedUser } = useLogBatchRefund()

const percentageArray = ref([
	{ name: '10%', value: 10 },
	{ name: '20%', value: 20 },
	{ name: '30%', value: 30 },
	{ name: '40%', value: 40 },
	{ name: '50%', value: 50 },
	{ name: '60%', value: 60 },
	{ name: '70%', value: 70 },
	{ name: '80%', value: 80 },
	{ name: '90%', value: 90 },
	{ name: '100%', value: 100 }
])

const form = ref({
	bookingDate: ''
})
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped></style>
