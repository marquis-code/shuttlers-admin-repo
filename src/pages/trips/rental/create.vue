<template>
	<main class="flex w-full h-[calc(100vh-150px)] m-0 p-0">
		<section class="flex flex-col lg:w-6/12 xl:w-7/12 w-full pb-0">
			<h1 class="text-2xl font-bold">
				Rent a Vehicle
			</h1>
			<p class="text-[#595E5C]">
				Explore our diverse selection of vehicle categories
			</p>
			<div class="overflow-y-auto lg:mt-10 mt-4">
				<ModulesTripsRentalVehicleList />
			</div>
		</section>
		<section v-if="step<3 && shouldShowOnSmallScreen" class="lg:flex flex-col h-full border lg:w-6/12 xl:w-5/12  !z-[40] lg:relative absolute right-0 w-full inset-y-0 bg-light">
			<ModulesTripsRentalSelectedVehicle v-if="Object.keys(selectedVehicle).length" />
			<ModulesTripsRentalSelectedVehicleList v-else-if="Object.keys(selectedVehicle).length === 0 && selectedVehiclessList.length" />
			<div v-else id="emptyState" class="lg:flex flex-col items-center text-center my-auto hidden">
				<!-- <Icon name="bus" class="w-20 text-neut3 mb-4" /> -->
				<img src="@/assets/icons/source/bus.svg" class="w-20 mx-auto">
				<p class="text-lg">
					No vehicle information available
				</p>
				<span class="text-neut6 max-w-[230px]">Kindly select a bus to see more details</span>
			</div>
		</section>
		<section v-else-if="step === 3" class="lg:flex flex-col h-full border lg:w-6/12 xl:w-5/12 !z-[40] lg:relative absolute right-0 w-full inset-y-0 bg-light">
			<ModulesTripsRentalForm />
		</section>
	</main>
</template>

<script setup lang="ts">
import { use_post_charter, useCharterVehicleUsage } from '@/composables/modules/Rentals'
import { windowWidth } from '@/composables/utils/window'

const { selectedVehicle, selectedVehiclessList, step } = useCharterVehicleUsage()

const shouldShowOnSmallScreen = computed(() => {
	if (windowWidth.value > 1024) return true
	if (step.value === 1 && Object.keys(selectedVehicle.value).length) return true
	if (step.value === 2 && selectedVehiclessList.value.length) return true
	else return false
})

// const { isLoggedIn } = useUser()
const { charter, loading, disabled, credentials } = use_post_charter()

onMounted(() => {
	const doc = document.querySelector('body .zsiq_floatmain')
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped>
body .zsiq_floatmain {
    position: fixed;
	bottom: 120px !important;
    max-width: 305px;
    box-sizing: border-box;
}
</style>
