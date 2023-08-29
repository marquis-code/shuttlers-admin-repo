<template>
	<main>
		<div class="mb-6">
			<button class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2" @click="router.go(-1)">
				Go back
			</button>
		</div>
		<div class="bg-white rounded-md border w-11/12 lg:w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Batch book a trip
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5">
				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Upload Customer emails (csv only)Download csv template</label>
					<input type="file" name=""
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Select Route</label>
					<input type="text" name=""
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Select Itinerary</label>
					<input type="text" name=""
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Select Pickup Point</label>
						<input type="text" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Select Drop-off Point</label>
						<input type="text" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>
				<div class="w-full lg:w-6/12">
					<label for="" class="text-sm font-light text-gray">
						Choose Date</label>
					<date-picker v-model:value="form.bookingDate" style="width: 100%" class="font-light"
						placeholder="Filter by date" />
				</div>
				<div class="w-full lg:w-6/12">
					<label for="" class="text-sm font-light text-gray">
						Select Payment Source</label>
					<input type="text" name=""
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div class="space-x-2">
					<span class="text-gray-500 text-sm">Is Subscription?</span>
					<input type="checkbox" name="" class="outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div class="space-x-2">
					<span class="text-gray-500 text-sm">With Luggage?</span>
					<input type="checkbox" name="" class="outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div>
					<button class="py-3 bg-black text-white px-4 rounded-lg">
						Confirm and Book Ride
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script lang="ts" setup>
const router = useRouter()

const form = ref({
	bookingDate: ''
})
</script>
