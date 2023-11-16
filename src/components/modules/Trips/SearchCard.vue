<template>
	<aside class="relative">
		<Popover class="relative">
			<PopoverButton
				id="search-card"
				class="btn flex outline-none items-center  font-normal"

			>
				<img src="@/assets/icons/source/unfold.svg" alt="" class="h-7 px-0 ml-2 hover:bg-gray-100 cursor-pointer w-10 mb-3 rounded-md">
			</PopoverButton>

			<transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="translate-y-1 opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0"
			>
				<PopoverPanel
					v-slot="{ close }"
					class="absolute left-0 z-[500] mt-1"
				>
					<div
						class="absolute start-0 z-10 mt-2 w-80 rounded-md border border-gray-100 bg-white shadow-lg"
						role="menu"
					>
						<div class="p-2 flex flex-col gap-5">
							<form class="flex flex-col gap-2" @submit.prevent="">
								<select id="" v-model="tripTypeInput" name="" class="input-field">
									<option value="active">
										active
									</option>
									<option value="upcoming">
										upcoming
									</option>
									<option value="completed">
										completed
									</option>
								</select>
								<div class="flex gap-2">
									<input v-model="searchValue" type="search" :placeholder="`search ${tripTypeInput} trips`" class="input-field">
									<button class="btn-primary">
										Apply
									</button>
								</div>
							</form>
							<section v-if="!loading" class="flex flex-col gap-3 overflow-auto max-h-[500px] pb-4">
								<div v-for="trip in fetchedData[tripTypeInput]" :key="trip.id" class="border shadow-sm rounded-md" @click="onCardClick(close, trip)">
									<div class="p-2 cursor-pointer">
										<RouteDescription class="text-xs" :pickup="trip?.route?.pickup" :destination="trip?.route?.destination" />
										<div class="flex items-center gap-3 mt-2">
											<p class="text-xs  font-medium">
												{{ trip?.route?.route_code }}
											</p>
											<p class="text-xs  font-medium">
												{{ trip?.itinerary?.trip_time }}
											</p>
											<p class="text-xs  font-medium">
												{{ useDateFormat(trip.trip_start_time, 'YYYY-MM-DD').value }}
											</p>
										</div>
									</div>
								</div>
							</section>
							<Skeleton v-else height="120px" radius="5px" />
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</aside>
</template>

<script setup lang="ts">
import { useDateFormat, useMagicKeys } from '@vueuse/core'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useTripCardSearch } from '@/composables/modules/trips/card'

const { fetchedData, loading, fetchTrips } = useTripCardSearch()

const { meta, x /* keys you want to monitor */ } = useMagicKeys()

watchEffect(() => {
	if (meta.value && x.value) {
	const searchCard = document.getElementById('search-card')
   if (searchCard) {
       searchCard.click()
   } else {
       console.error('Element with id "search-card" not found')
   }
  }
})

const searchValue = ref('')
const props = defineProps({
    tripType: {
        type: String,
        required: true
    }
})

const onCardClick = (close, trip) => {
	useRouter().push(`/trips/type/${tripTypeInput.value}/${trip.id}/trip-details`)
	close()
}
const tripTypeInput = ref(props.tripType)

watch(tripTypeInput, (val) => {
	fetchTrips({ tripType: val })
}, { immediate: true })

</script>

<style scoped>

</style>
