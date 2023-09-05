<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<form class="bg-white rounded-md border w-11/12 lg:w-[567px] p-8 flex flex-col gap-6" @submit.prevent="logBatchRefund">
			<header class="flex flex-col gap-2 mb-3">
				<h1 class="text-2xl font-bold">
					Log Refund
				</h1>
				<p class="text-grey6">
					Kindly input the correct informations
				</p>
			</header>
			<div class="field relative">
				<label for="email">Select user</label>
				<InputMultiSelect id="select_users_input" v-model="logRefundData.user.value"
					track-by="id" placeholder="Select user to log refund" :custom-label="(data)=>`${data.fname} ${data.lname} - (${data.email})`"
					open-direction="bottom" :options="queriedUsers" :multiple="false" :searchable="true"
					:loading="loadingQueriedUsers" :internal-search="false"
					:options-limit="300" :limit="10"
					:show-no-results="false" :hide-selected="true" @search-change="queryUsers" />
			</div>

			<div class="field relative">
				<label for="trip">Select past trip</label>
				<select v-if="logRefundData.user_id.value" id="" v-model="logRefundData.trip_id.value" class="input-field">
					<option value="">
						Select trip
					</option>
					<option v-for="item in pastBookingsList" :key="item.id" :value="item.id">
						{{ item.route }}
					</option>
				</select>
			</div>

			<div class="field relative">
				<label for="percentage">Refund percentage</label>
				<input id="percentage" autocomplete="true" type="text" class="input-field" required>
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
import { useQueryUsers } from '@/composables/modules/users/query'
import { useLogBatchRefund } from '@/composables/modules/users/batch-refund/create'

const { loading, logBatchRefund, logRefundData, pastBookingsList } = useLogBatchRefund()

const { loadingQueriedUsers, queriedUsers, queryUsers } = useQueryUsers()

const router = useRouter()

const test = ref([])
const usersList = ref([1, 2, 3, 4, 5])
const isLoading = ref(false)
const asyncFindUsers = async (query: string) => {
	isLoading.value = true
	await new Promise((resolve) => setTimeout(resolve, 1000))
	isLoading.value = false
}

const form = ref({
	bookingDate: ''
})
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped></style>
