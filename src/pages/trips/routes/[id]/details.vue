<template>
	<main class="flex gap-x-6">
		<section class="w-6/12 space-y-6">
			<div class="card">
				<div v-for="(itm, index) in routeDetails" :key="index" class="flex  gap-x-6 items-center py-4 border-b">
					<div class="text-xs w-1/4">
						{{ itm.name }}
					</div>
					<div class="text-xs w-3/4">
						<button :class="itm.class" class="font-medium" @click="itm.func">
							{{ itm.value }}
						</button>
					</div>
				</div>
			</div>
			<div>
				<Table :loading="loading" :headers="tableFields" :table-data="tableData" :has-options="true">
					<template #header>
						<h1 class="border bg-white py-3 text-sm pl-4">
							Drivers on this route
						</h1>
					</template>
					<template #item="{ item }">
						<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
							<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
							<span class="block">{{ item.data.email }}</span>
							<span class="block">{{ item.data.phone }}</span>
						</div>
					</template>
				</Table>
			</div>

			<div class="card">
				<div class="flex justify-between items-center border-b py-3">
					<p class="text-sm">
						Who pays for booking?
					</p>
					<p class="text-sm">
						owner
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-3">
					<p class="text-sm">
						When is payment happening?
					</p>
					<p class="text-sm">
						post-trip
					</p>
				</div>
				<div class="flex justify-between items-center py-3">
					<p class="text-sm">
						Who owns this route?
					</p>
					<p class="text-sm">
						corporate
					</p>
				</div>
			</div>
		</section>
		<section class="w-6/12 space-y-6">
			<div class="rounded-md bg-white shadow-md">
				<p class="border-b text-gray-500 font-medium text-sm p-4">
					Passengers
				</p>
				<div class="p-3 space-y-6">
					<div class="">
						<label for="">Filter By Company</label>
						<InputMultiSelectUsers v-model="selectedCorporate" />
					</div>
					<div>
						<button class="bg-black text-white text-xs px-3 py-2 rounded-md">
							Apply Filter
						</button>
					</div>
					<div>
						<Table :loading="loading" :headers="tableFields" :table-data="tableData" :has-options="true">
							<template #header>
								<h1 class="border bg-white py-3 text-sm pl-4">
									Drivers on this route
								</h1>
							</template>
							<template #item="{ item }">
								<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
									<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
									<span class="block">{{ item.data.email }}</span>
									<span class="block">{{ item.data.phone }}</span>
								</div>
							</template>
						</Table>
					</div>
				</div>
			</div>

			<div class="rounded-md bg-white shadow-md">
				<div class="flex justify-between items-center border-b py-3 px-4">
					<div>
						<p class="text-sm">
							Reports
						</p>
					</div>
					<div class="relative">
						<div
							class=""
						>
							<button
								class=""
							>
								<span class="sr-only">Menu</span>
								<img src="@/assets/icons/source/download.svg" alt="download icon">
							</button>
							<a
								href="#"
								class="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
							>
								Download
							</a>

							<button
								class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
							>
								<span class="sr-only">Menu</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<div
							class="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
							role="menu"
						>
							<div class="p-2">
								<button v-for="(itm, idx) in downloadOptions" :key="idx" href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
									role="menuitem"
									@click="itm.func"
								>
									{{ itm.name }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="p-4 space-y-6">
					<p class="font-medium text-sm">
						Business Booking Report
					</p>
					<div class="">
						<label for="" class="text-xs">Company</label>
						<InputMultiSelectUsers v-model="selectedCorporate" />
					</div>
					<div>
						<label for="month" class="text-xs">Month</label>
						<select id="month" v-model="selectedMonth" class="input-field" required>
							<option value="" class="text-sm">
								Select Month
							</option>
							<option v-for="item in monthsArray" :key="item.value" :value="item.value">
								{{ item.name }}
							</option>
						</select>
					</div>
					<button class="bg-black text-white px-3 py-2 text-xs rounded-md">
						Generate
					</button>
				</div>
			</div>

			<div class="rounded-md bg-white shadow-md">
				<div class="flex justify-between items-center p-6">
					<p>Payment Options</p>
					<button class="bg-black text-xs text-white px-4 py-1 rounded-md">
						Edit
					</button>
				</div>
				<div class="px-6 pb-4 grid grid-cols-3 gap-3">
					<div v-for="(itm, idx) in paymentOptions" :key="idx" class="flex items-center gap-x-2">
						<input id="" type="checkbox">
						<label for="" class="text-sm font-light mt-1.5">{{ itm.name }}</label>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script setup lang="ts">
import { useRouteIdDetails } from '@/composables/modules/routes/id'
const { selectedRoute, loading, getRouteById } = useRouteIdDetails()
const id = useRoute().params.id as string
getRouteById(id)
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const monthsArray = ref([
	{ name: 'Jan', value: 1 },
	{ name: 'Feb', value: 2 },
	{ name: 'Mar', value: 3 },
	{ name: 'Apr', value: 4 },
	{ name: 'May', value: 5 },
	{ name: 'Jun', value: 6 },
	{ name: 'Jul', value: 7 },
	{ name: 'Aug', value: 8 },
	{ name: 'Sep', value: 9 },
	{ name: 'Oct', value: 10 },
	{ name: 'Nov', value: 11 },
	{ name: 'Dec', value: 12 }
])

const selectedMonth = ref('')

const routeDetails = computed(() => {
	return [
		{ name: 'Status', value: 'Active', class: 'text-white bg-shuttlersGreen px-2 py-1 rounded-md', func: () => {} },
		{ name: 'Route Code', value: 'FST200', class: 'text-gray-600', func: () => {} },
		{ name: 'Route Description', value: 'Not Available', class: 'text-gray-600', func: () => {} },
		{ name: 'Route landing page url', value: 'https://test.shuttlers.africa/routes/21-road-de-close-festac-town-satellite-town-to-akin-adesola-street', class: '', func: (val) => { handleClick(val) } },
		{ name: 'Starting Point', value: '21 Road, DE Close, Festac Town, Satellite Town, Nigeria', class: 'text-gray-600', func: () => {} },
		{ name: 'Ending Point', value: 'Akin Adesola Street, Lagos, Nigeria', class: 'text-gray-600', func: () => {} },
		{ name: 'Capacity', value: '1', class: 'text-gray-600', func: () => {} },
		{ name: 'Days Available', value: 'Everyday', class: 'text-gray-600', func: () => {} },
		{ name: 'Availability Start Date', value: 'Mon Jan 09 2023', class: 'text-gray-600', func: () => {} },
		{ name: 'Availability End Date', value: 'Not Available', class: 'text-gray-600', func: () => {} },
		{ name: 'Unavailable Dates', value: '2023-10-03', class: 'text-orange-600', func: () => {} },
		{ name: 'Distance', value: '21.94 km', class: 'text-gray-600', func: () => {} },
		{ name: 'Trip start time', value: '3:00 PM', class: 'text-gray-600', func: () => {} },
		{ name: 'Duration', value: '40 mins', class: 'text-gray-600', func: () => {} },
		{ name: 'Availability', value: 'private', class: 'bg-black text-white px-2 py-1 rounded-md', func: () => {} },
		{ name: 'Business user', value: 'Shuttlers', class: 'text-gray-600', func: () => {} },
		{ name: 'City', value: 'Lagos' }
	]
})

const tableFields = ref([
    {
        text: 'DRIVER',
        value: 'driver'
    },
    {
        text: 'TYPE',
        value: 'type'
    },
    {
        text: 'ITINERARY',
        value: 'itinerary'
    }
])

const selectedCorporate = ref(1)
const tableData = ref([])

const handleClick = (val: any) => {
    window.open(val.target.innerHTML, '_blank')
}

const downloadOptions = computed(() => {
	return [
        { name: 'This Week', func: () => {} },
        { name: 'This Month', func: () => {} },
		{ name: 'Custom', func: () => {} }
    ]
})

const paymentOptions = ref([
	{
		name: 'Pay with Card',
		val: 'card'
	},
	{
		name: 'Pay with Pocket',
		val: 'pocket'
	},
	{
		name: 'Charge my Company',
		val: 'company'
	},
	{
		name: 'Pay with Bank',
		val: 'bank'
	},
	{
		name: 'Pay with Transfe',
		val: 'transfer'
	},
	{
		name: 'Pay with Credit line',
		val: 'credit_line'
	},
	{
		name: 'Pay with Wallet',
		val: 'wallet'
	},
	{
		name: 'Pay Offline',
		val: 'offline'
	}
])
</script>

<style scoped></style>
