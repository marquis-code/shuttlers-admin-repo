<template>
	<main class="flex flex-col lg:flex-row items-start gap-y-5 gap-x-7 xl:gap-x-20">
		<router-link to="/" class="btn bg-transparent text-dark border border-dark shrink-0 py-2 px-3 text-sm">
			Go back
		</router-link>
		<div class="w-full flex-grow border bg-white rounded-lg p-[16px] flex flex-col gap-5 xl:max-w-[700px]">
			<div class="flex flex-col gap-[6px] border-b pb-3">
				<h3 class="m-0 text-lg text-[#444854] font-medium ">
					Auction route itinerary
				</h3>
				<p class="text-xs font-medium text-[#313533]">
					{{ 'ABR110' }} • {{ '24-10-2023' }} • {{ '5:45 AM' }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">Bidding start date</label>
					<InputDateInput class="font-light" placeholder="Filter by date" :disabled-date="startFromTomorrow" />
				</div>
				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">Bidding start time</label>
					<InputDateInput class="font-light" value-type="format" format="hh:mm a" type="time" placeholder="hh:mm a" />
				</div>
			</div>

			<div class="flex flex-col gap-[12px] md:flex-row md:justify-between">
				<div class="head_box">
					<p class="head">
						Duration
					</p>
					<p class="sub">
						How long should this auction run?
					</p>
				</div>
				<div class="flex items-center gap-4">
					<div class="flex flex-col gap-2">
						<label class="text-xs font-medium text-[#6E717C]">Hours</label>
						<select class="w-[100px] px-2 py-3 border rounded">
							<option v-for="n in 12" :key="n" :value="n" class="text-xs text-[#313533]">
								{{ n }} {{ n > 1 ? 'hours' : 'hour' }}
							</option>
						</select>
					</div>

					<div class="flex flex-col gap-2">
						<label class="text-xs font-medium text-[#6E717C]">Minutes</label>
						<select class="min-w-[100px] max-w-fit  px-2 py-3 border rounded">
							<option v-for="n in [5, 10, 15, 30, 45, 50]" :key="n" :value="n" class="text-xs text-[#313533]">
								{{ n }} minutes
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="flex flex-col items-start gap-3 lg:flex-row lg:justify-between">
				<div class="head_box">
					<p class="head">
						Winning bids
					</p>
					<p class="sub">
						Please provide the number of winning bids to be assigned for this route itinerary.
					</p>
				</div>
				<div class="w-full max-w-[250px] grid grid-cols-3 rounded-lg border overflow-hidden">
					<button class="border-none text-lg bg-transparent h-[50px] disabled:cursor-not-allowed" :disabled="no_of_bids <= 1" @click="no_of_bids--">
						-
					</button>
					<p class="flex items-center justify-center text-sm text-dark font-medium border-left border-right h-full">
						{{ no_of_bids }}
					</p>
					<button class="border-none text-lg bg-transparent h-[50px]" @click="no_of_bids++">
						+
					</button>
				</div>
			</div>
			<div class="w-full border" />

			<div class="head_box">
				<p class="head">
					Preferred vehicle details
				</p>
				<p class="sub">
					Please provide the details of the vehicle preferred for this route. Note that this would not stop vehicle partner from providing other type of vehicles.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">Brand type</label>
					<select class="w-full px-2 py-3 border rounded">
						<option value="n" class="text-xs text-[#313533]">
							brand 1
						</option>
					</select>
				</div>

				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">Model type</label>
					<select class="w-full px-2 py-3 border rounded">
						<option value="n" class="text-xs text-[#313533]">
							Model 1
						</option>
					</select>
				</div>

				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">Year</label>
					<select class="w-full px-2 py-3 border rounded">
						<template v-for="n in 50">
							<option v-if="1990+n <= new Date().getFullYear()" :key="n" :value="1990+n" class="text-xs text-[#313533]">
								{{ 1990+n }}
							</option>
						</template>
					</select>
				</div>

				<div class="flex flex-col gap-[6px]">
					<label class="text-[#6E717C] text-xs font-medium m-0">No of seats</label>
					<select class="w-full px-2 py-3 border rounded">
						<option value="n" class="text-xs text-[#313533]">
							12 seats
						</option>
					</select>
				</div>
			</div>

			<button disabled class="bg-dark rounded px-3 py-2 text-sm text-white border-none w-fit disabled:bg-[#ACAFAE]">
				Auction route itinerary
			</button>
		</div>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const date = ref()
const time = ref()
const no_of_bids = ref(1)

const startFromTomorrow = (date) => {
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	tomorrow.setHours(0, 0, 0, 0)

    return date < tomorrow
}

</script>

<style scoped>
span,p,h1,h2,h3,h4,h5,h6,label {
	margin: 0 !important;
}

.head{
	font-size: 14px;
	color: #101211;
	font-weight: 500;
}

.sub{
	font-size: 12px;
	color: #6E717C;
	font-weight: 500;
}

.head_box{
	display: flex;
	flex-direction: column;
	gap: 4px;
}
</style>
