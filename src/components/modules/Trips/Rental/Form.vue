<template>
	<form class="relative h-full flex flex-col w-full" @submit.prevent="charter">
		<section class="relative flex flex-col overflow-y-auto py-4 pb-40">
			<div class="flex gap-4 text-lg text-black mb-5 cursor-pointer font-bold px-5" @click="step = 2">
				<icon name="close" class="w-7" />
				Charter shuttle
			</div>

			<div class="flex justify-between items-start bg-green05 p-5 py-4 max-w-[100vw] h-full">
				<div class="flex flex-col gap-2 flex-grow">
					<div class="isolate flex -space-x-5 overflow-hidden p-2 w-auto max-w-[100vw]" :class="[combineVehicleInfo.images.length === 1 ? '':'md:min-w-[96px]']">
						<img
							v-for="(n,idx) in combineVehicleInfo.images"
							:key="n"
							class="relative  inline-block md:h-12 md:w-12 h-9 w-9 rounded-full ring-2 ring-green7 object-contain bg-light"
							:src="n"
							:class="[idx === 0 ? 'z-50' : 'z-30']"
							alt=""
						>
					</div>
					<span class="flex flex-col w-full ml-2.5">
						<!-- <h1 class="text-sm md:text-base font-semibold flex-wrap w-[80%] truncate">{{ combineVehicleInfo.name }}</h1> -->
						<h1 v-for="n in combineVehicleInfo.name.split(' & ')" :key="n"
							class="text-sm md:text-base font-semibold flex-wrap w-[80%] truncate"
						>
							{{ n }}
						</h1>
						<p class="text-xs">No of vehicles: <span class="font-bold">{{ combineVehicleInfo.count }}</span></p>
					</span>
				</div>

				<div class="flex flex-col w-fit shrink-0">
					<span class="text-neut6 text-[11px]">Starting from</span>
					<h4 class="font-bold text-green7 md:text-base text-sm">
						{{ convertToCurrency(combineVehicleInfo.cost) }}
					</h4>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
				<div class="field relative">
					<label for="email">First Name</label>
					<input
						id="fname"
						v-model="credentials.fname.value"
						autocomplete="off"
						type="text"
						class="input-field"
						required
					>
				</div>
				<div class="field relative">
					<label for="email">Last Name</label>
					<input
						id="fname"
						v-model="credentials.lname.value"
						autocomplete="off"
						type="text"
						class="input-field"
						required
					>
				</div>
				<div class="field relative">
					<label for="email">Email</label>
					<input
						id="fname"
						v-model="credentials.email.value"
						autocomplete="off"
						type="text"
						class="input-field"
						required
					>
				</div>
				<div class="field relative">
					<label for="email">Phone</label>
					<input
						id="fname"
						v-model="credentials.phone.value"
						autocomplete="off"
						type="text"
						class="input-field"
						required
					>
				</div>
			</div>
			<div class="w-full relative pr-4 px-5">
				<!-- <DashboardCharterSearchBox /> -->
				<ModulesTripsRentalSearchBox />
			</div>

			<div class="field relative mt-6">
				<label for="email">Departure</label>
				<!-- <DateInput v-model="credentials.pickup_date.value" :disabled-date="(date: any) => date <= new Date().setHours(0, 0, 0, 0)" /> -->
				<InputDateInput v-model="credentials.pickup_date.value" clearable />
			</div>
			<div class="field relative mt-6">
				<label for="email">Time</label>
				<!-- <DatePicker v-model:value="credentials.pickup_time.value" format="hh:mm a" type="time" value-type="format" /> -->
				<InputTimeInput v-model="credentials.pickup_time.value" />
			</div>
			<div class="field relative mt-6">
				<label for="email">Number of Passengers</label>
				<div class="input-field">
					<ModulesTripsRentalCounter v-model="credentials.passengers.value" />
				</div>
			</div>

			<div class="field relative mt-6">
				<label for="stops">Number of stops</label>
				<input
					id="time"
					v-model="credentials.stopsCount.value"
					autocomplete="off"
					type="number"
					class="input-field"
					min="0"
					@change="credentials.stops.value = []"
				>
			</div>
			<div v-for="n in credentials.stopsCount.value" :key="n" class="field relative mt-6">
				<label for="stops">Stop {{ n }} </label>
				<LocationInput
					:id="n+'stops'"
					autocomplete="off"
					placeholder="Enter location"
					type="text"
					class="input-field"
					required
					@change="credentials.stops.value.push($event)"
				/>
			</div>

			<ToggleButton v-model="credentials.isReturning.value" label="Return trip" name="return_trip" class="mt-6 px-5" />

			<div v-if="credentials.isReturning.value" class="field relative mt-6">
				<label for="email">Return Date</label>
				<!-- <DateInput id="return" v-model="credentials.return_date.value" :disabled-date="disabledDate" /> -->
				<InputDateInput v-model="credentials.return_date.value" :disabled-date="disabledDate" clearable />
			</div>
			<div v-if="credentials.isReturning.value" class="field relative mt-6">
				<label for="email">Time</label>
				<!-- <DatePicker v-model:value="credentials.return_time.value" value-type="format" format="hh:mm a" type="time" /> -->
				<InputTimeInput v-model="credentials.return_time.value" />
				{{ credentials.return_time.value }}
			</div>
		</section>
		<footer class="absolute bottom-0 inset-x-0 border-t p-4 grid grid-cols-1 items-end gap-4 bg-white">
			<button class="auth-form-btn" :disabled="disabled || loading">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">Send charter request
				</span>
				<Spinner v-else />
			</button>
		</footer>
	</form>
</template>

<script setup lang="ts">
import DatePicker from 'vue-datepicker-next'
import { useCharterVehicleUsage, use_post_charter } from '@/composables/modules/Rentals'
import { convertToCurrency } from '@/composables/utils/formatter'
// import { useUser } from '@/composables/apis/user'

// const { isLoggedIn } = useUser()
const { charter, loading, disabled, credentials } = use_post_charter()
const { selectedVehiclessList, step } = useCharterVehicleUsage()

const combineVehicleInfo = computed(() => {
    const nameArr: string[] = []
    let totalCount = 0
    const imageArr: string[] = []
    let totalCost = 0

    for (const vehicle of selectedVehiclessList.value) {
        nameArr.push(vehicle.name)
		totalCount += vehicle.count
		if (imageArr.length < 2) {
			imageArr.push(vehicle.images[0])
		}

        totalCost += vehicle.count * vehicle.price
    }

    return {
        name: nameArr.join(' & '),
        count: totalCount,
        images: imageArr,
        cost: totalCost
    }
})

const disabledDate = computed(() => (date:any) => {
	    const currentDate = new Date(date)
        const passedDate = new Date(credentials.pickup_date.value)
        if (currentDate.toLocaleDateString().split('T')[0] === passedDate.toLocaleDateString().split('T')[0]) {
            return false
        }
	  return new Date(credentials.pickup_date.value) > date
})
</script>

<style scoped>
.shd {
    box-shadow: 0px 2px 8px 0px rgba(94, 94, 94, 0.12);
}

.field {
    @apply px-5
}
</style>
