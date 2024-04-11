<template>
	<section>
		<div v-if="!loading" class="card">
			<div v-for="(itm, index) in routeDetails" :key="index" class="flex  gap-x-6 items-center py-4 border-b last:border-none">
				<p class="text-sm w-[100px] shrink-0">
					{{ itm.name }}
				</p>
				<div class="text-sm">
					<button :class="itm.class" class="font-medium text-left" @click="itm.func">
						{{ itm.value }}
					</button>
					<button v-if="itm.copyAction" @click="copyUrl()">
						<img src="@/assets/icons/source/copy.svg" class="w-4" alt="">
					</button>
				</div>
			</div>
		</div>
		<Skeleton v-else height="300px" />
	</section>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
import { useRouteIdDetails, useTripStartTimeById } from '@/composables/modules/routes/id'
import { customer_web_app_url } from '@/composables/utils/system'

const { loadingRouteItineraries, getTripStartTimeById, itineraries } = useTripStartTimeById()
const { selectedRoute, loadingRouteDetails: loading, getRouteById } = useRouteIdDetails()
const routeDetails = computed(() => {
	return [
		{ name: 'Status', value: selectedRoute.value.status === 1 ? 'Active' : 'Inactive', class: `text-white text-xs px-2 py-1 rounded-md ${selectedRoute.value.status === 1 ? 'bg-shuttlersGreen' : 'bg-rose-500'}`, func: () => { } },
		{ name: 'Route Code', value: selectedRoute.value.route_code, class: 'text-gray-600', func: () => { } },
		{ name: 'Route Description', value: selectedRoute?.value?.info?.description || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'Route landing page url', value: routeUrl.value, class: 'text-shuttlersGreen', func: (val: string) => { handleClick(val) }, copyAction: true },
		{ name: 'Starting Point', value: selectedRoute?.value?.pickup, class: 'text-gray-600', func: () => { } },
		{ name: 'Ending Point', value: selectedRoute?.value?.destination, class: 'text-gray-600', func: () => { } },
		{ name: 'Capacity', value: selectedRoute?.value?.total_seats ?? 'N/A', class: 'text-gray-600', func: () => { } },
		{ name: 'Days Available', value: routeAvailableDays.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Availability Start Date', value: routeStartDate.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Availability End Date', value: routeEndDate.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Unavailable Dates', value: routeUnavailableDays.value, class: 'text-orange-600', func: () => { } },
		{ name: 'Distance', value: selectedRoute?.value?.distance, class: 'text-gray-600', func: () => { } },
		{ name: 'Trip start time', value: computedTripStartTime.value, class: 'text-gray-600', func: () => { } },
		{ name: 'Duration', value: selectedRoute?.value?.duration, class: 'text-gray-600', func: () => { } },
		{ name: 'Availability', value: selectedRoute?.value?.visibility, class: `text-white px-2 py-1 rounded-md ${selectedRoute?.value?.visibility === 'public' ? 'bg-shuttlersGreen' : 'bg-black'}`, func: () => { } },
		{ name: 'Business user', value: selectedRoute?.value?.corporate ? selectedRoute?.value?.corporate?.corporate_name : 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'City', value: selectedRoute?.value?.city ? selectedRoute?.value?.city?.name : '-' }
	]
})

const routeUrl = computed(() => {
	if (selectedRoute?.value?.id) {
		switch (import.meta.env.VITE_ENV_ALIAS) {
			case 'test':
			case 'TEST':
				return `${customer_web_app_url.test}/dashboard/discover/${selectedRoute?.value.id}`
			case 'staging':
			case 'QA':
				return `${customer_web_app_url.staging}/dashboard/discover/${selectedRoute?.value.id}`
			case 'prod':
			case 'PROD':
				return `${customer_web_app_url.prod}/dashboard/discover/${selectedRoute?.value.id}`
			default:
				return `${customer_web_app_url.test}/dashboard/discover/${selectedRoute?.value.id}`
		}
	} else {
		return ''
	}
})

const computedTripStartTime = computed(() => {
	if (itineraries.value?.length) {
		return itineraries.value[0].trip_time
	} else {
		return 'N/A'
	}
})

const routeAvailableDays = computed(() => {
	if (selectedRoute.value?.route_availability_days) {
		const days = JSON.parse(selectedRoute.value?.route_availability_days)
		if (!days || !days.length) return 'Not available'
		return days.length === 7 ? 'Everyday' : days.join(', ')
	} else {
		return 'Not available'
	}
})

const routeUnavailableDays = computed(() => {
	const days = selectedRoute?.value?.blacklisted_availability_days
	return days ? Array.from(JSON.parse(days) || []).join(', ') : 'Not Available'
})

const routeStartDate = computed(() => {
	return selectedRoute?.value?.route_availability_start_date ? new Date(selectedRoute?.value?.route_availability_start_date).toDateString() : 'Not Available'
})

const routeEndDate = computed(() => {
	return selectedRoute?.value?.route_availability_end_date ? new Date(selectedRoute?.value?.route_availability_end_date).toDateString() : 'Not Available'
})

const copyUrl = async () => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(routeUrl.value)
		} else {
			const el = document.createElement('input')
			el.value = routeUrl.value
			el.style.opacity = String(0)
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
		}
		useAlert().openAlert({ type: 'Alert', msg: 'Copied to clipboard!' })
	} catch (e) {
		(e)
	}
}

const handleClick = (val: any) => {
	window.open(val.target.innerHTML, '_blank')
}

const id = useRoute().params.id as string
getRouteById(id)
getTripStartTimeById(id)

</script>

<style></style>
