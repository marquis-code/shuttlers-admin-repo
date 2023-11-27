<template>
	<Modal
		modal="$atts.modal"
		title="Transfer Bookings"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="transfer">
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">
					Select new driver
				</label>
				<!-- :custom-label="customLabel" label="fname" -->
				<VueMultiselect v-model="new_driver" placeholder="Search route" :searchable="true" :internal-search="true"
					:options="drivers" :multiple="false" :taggable="false" track-by="id" :loading="false" label=" "
				>
					<template v-if="new_driver?.id" #selection="">
						<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
							<img v-if="new_driver.avatar" :src="new_driver.avatar" class="w-10 h-10 rounded-full object-cover border" alt="">
							<img v-else src="@/assets/images/avatar.png" class="w-10 h-10 rounded-full object-cover border" alt="">
							<div class="flex flex-col gap-1">
								<p class="text-sm">
									{{ new_driver.fname || '' }} {{ new_driver.lname || '' }}
								</p>
								<p v-if="new_driver.vehicle?.name" class="text-xs">
									{{ new_driver.vehicle.brand }} {{ new_driver.vehicle.name }} {{ new_driver.vehicle.registration_number ? `• ${new_driver.vehicle.registration_number}` : '' }} {{ new_driver.vehicle.seats ? `• ${new_driver.vehicle.seats} Seater` : '' }}
								</p>
								<p v-else class="text-xs">
									No vehicle assigned
								</p>
							</div>
						</div>
					</template>
					<template #option="{ option }">
						<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
							<img v-if="option.avatar" :src="option.avatar" class="w-10 h-10 rounded-full object-cover border" alt="">
							<img v-else src="@/assets/images/avatar.png" class="w-10 h-10 rounded-full object-cover border" alt="">
							<div class="flex flex-col gap-1">
								<p class="text-sm">
									{{ option.fname || '' }} {{ option.lname || '' }}
								</p>
								<p v-if="option.vehicle?.name" class="text-xs">
									{{ option.vehicle.brand }} {{ option.vehicle.name }} {{ option.vehicle.registration_number ? `• ${option.vehicle.registration_number}` : '' }} {{ option.vehicle.seats ? `• ${option.vehicle.seats} Seater` : '' }}
								</p>
								<p v-else class="text-xs">
									No vehicle assigned
								</p>
							</div>
						</div>
					</template>
				</VueMultiselect>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Transfer booking' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { useItineraries } from '@/composables/modules/routes/itineraries'
import { useTransferBooking } from '@/composables/modules/routes/itineraries/driver'
import { useAlert } from '@/composables/core/notification'

// const { singleItinerary: itinerary } = useItineraries()
const { new_driver, drivers, loading, transfer } = useTransferBooking()

const enableButton = computed(() => {
	return !!new_driver.value
})

onBeforeUnmount(() => new_driver.value = {})
</script>

<style scoped>
label{
	margin: 0;
}
</style>
