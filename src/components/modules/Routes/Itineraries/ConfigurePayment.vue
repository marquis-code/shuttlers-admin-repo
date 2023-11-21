<template>
	<div class="card">
		<div class="card-body flex-col">
			<h3 class="card-title text-[#101211] font-medium mb-[20px]">
				Configure payment for this itenary
			</h3>
			<div class="flex flex-col gap-[12px]">
				<ModulesRoutesItinerariesConfigureRadio v-for="n,i in arr" :key="i" :obj="n" @changed="updateModel" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

const payment_type = ref('seat')
const payer = ref('corporate')
const payment_plan = ref('postpaid')
const pricing_plan = ref('fixed')

const arr = ref([
	{
		title: 'SELECT A PAYMENT TYPE', model: payment_type, radios: [
			{ id: 'seat', name: 'paymentType', label: 'Per seat' },
			{ id: 'vehicle', name: 'paymentType', label: 'Per vehicle' }
		]
	},
	{
		title: 'SELECT A PAYER', model: payer, radios: [
			{ id: 'corporate', name: 'payer', label: 'Corporate' },
			{ id: 'user', name: 'payer', label: 'User' },
			{ id: 'passenger', name: 'payer', label: 'Passenger' }
		]
	},
	{
		title: 'SELECT A PAYMENT PLAN', model: payment_plan, radios: [
			{ id: 'postpaid', name: 'paymentPlan', label: 'Postpaid' },
			{ id: 'prepaid', name: 'paymentPlan', label: 'Prepaid' }
		]
	},
	{
		title: 'SELECT A PRICING PLAN', model: pricing_plan, radios: [
			{ id: 'fixed', name: 'pricingPlan', label: 'Fixed' },
			{ id: 'dynamic', name: 'pricingPlan', label: 'Dynamic' },
			{ id: 'bus_stop_based', name: 'pricingPlan', label: 'Bus stop based' }
		]
	}
])

const updateModel = (obj) => {
	if (obj.key === 'paymentType') {
		payment_type.value = obj.val
	} else if (obj.key === 'payer') {
		payer.value = obj.val
	} else if (obj.key === 'paymentPlan') {
		payment_plan.value = obj.val
	} else if (obj.key === 'pricingPlan') {
		pricing_plan.value = obj.val
	}
}

</script>
