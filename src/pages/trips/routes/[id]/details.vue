<template>
	<main class="flex gap-x-6">
		<section class="md:w-6/12 space-y-6">
			<ModulesRoutesDetailsInfoCard />
			<ModulesRoutesDetailsRouteDriversTable />
			<ModulesRoutesDetailsBookingInfoDetails />
		</section>
		<section class="md:w-6/12 space-y-6">
			<ModulesRoutesDetailsPassengers />
			<ModulesRoutesDetailsBookingReport />
			<ModulesRoutesDetailsPaymentOptions />
		</section>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
