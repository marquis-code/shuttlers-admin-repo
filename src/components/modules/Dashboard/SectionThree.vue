<template>
	<section class="card">
		<div class="border-b  pb-3">
			<div class="flex justify-between items-center">
				<div>
					<h3 class="font-medium px-6">
						Trip rating service
					</h3>
				</div>
				<div class="flex justify-end items-end">
					<InputDateInput id="startDate" v-model="form.rate" :disabled-date="() => { }" :range="true"
						class="font-light" placeholder="Filter by date" />
				</div>
			</div>
			<div class="pr-3" />
		</div>
		<div class="p-5 flex items-center gap-x-3">
			<Skeleton v-if="loadingTripRatingInfo" height="150px" width="400px" />
			<div v-else class="rounded-md border bg-white shadow-sm space-y-4 p-6 lg:w-4/12">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-400 font-light">
							Customer Satisfaction
						</p>
						<p>
							<span class="text-3xl font-bold">{{
								tripRatingData?.average?.toFixed(1)
							}}</span>/{{ tripRatingData?.max_value }}
						</p>
					</div>
					<div>
						<img src="@/assets/images/rating-star.jpg" alt=""
							class="rounded-full h-14 w-14 bg-yellow-200 p-3">
					</div>
				</div>
				<p class="flex items-center space-x-1">
					<span class="inline"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
						viewBox="0 0 24 24" fill="none" stroke="#21d369" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round">
						<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
						<path d="M15 7h6v6" />
					</svg></span>
					<span class="text-green-600 inline">{{ tripRatingData.count }} ratings in total</span>
				</p>
			</div>
			<Skeleton v-if="loadingRatingByDate" height="150px" width="400px" />
			<div v-if="loadingRatingByDate === false && isFilterUpdated === true"
				class="rounded-md border bg-white shadow-sm space-y-4 p-6 lg:w-6/12">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-400 font-light">
							Customer ratings between {{ useDateFormat(form?.rate[0], 'YYYY-MM-D').value }} & {{
								useDateFormat(form?.rate[1], 'YYYY-MM-D').value }}
						</p>
						<p>
							<span class="text-3xl font-bold">{{
								filteredRatingData?.rating
							}}</span>/5
						</p>
					</div>
					<div>
						<img src="@/assets/images/rating-star.jpg" alt=""
							class="rounded-full h-14 w-14 bg-yellow-200 p-3">
					</div>
				</div>
				<p class="flex items-center space-x-1">
					<span class="inline"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
						viewBox="0 0 24 24" fill="none" stroke="#21d369" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round">
						<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
						<path d="M15 7h6v6" />
					</svg></span>
					<span class="text-green-600 inline">{{ filteredRatingData?.count }} ratings in total</span>
				</p>
			</div>
		</div>
		<header>
			<h3 class="font-medium pb-3.5 px-6">
				Summary
			</h3>
		</header>
		<!-- <div class="p-5">
			<ChartsBarChart class="!h-72" :loading="loadingTripRatingInfo" :data="getRatingsChartData(tripRatingData)" />
		</div> -->
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { getRatingsChartData } from '@/composables/utils/charts'
import {
	useGetTripRatingInfo,
	useGetRatingInfoByDate
} from '@/composables/modules/dashboard/stats'
const { getTripRatingData, loadingTripRatingInfo, tripRatingData } = useGetTripRatingInfo()
const { getFilteredTripRating, loadingRatingByDate, filteredRatingData, payload } = useGetRatingInfoByDate()
const form = reactive({
	rate: []
})
const isFilterUpdated = ref(false)

payload.from.value = useDateFormat(form.rate[0], 'YYYY-MM-D').value
payload.to.value = useDateFormat(form.rate[1], 'YYYY-MM-D').value

watch(
	() => form,
	(currentValue, oldValue) => {
		getFilteredTripRating()
		isFilterUpdated.value = true
	},
	{ deep: true }
)

getTripRatingData()
</script>

<style scoped></style>
