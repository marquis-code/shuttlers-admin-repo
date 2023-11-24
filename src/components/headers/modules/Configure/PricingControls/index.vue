<template>
	<HeadersHeaderSlot title="Additional Charges" pre-title="Overview">
		<template #tabs>
			<div class="flex flex-col w-full">
				<RouterTabs :tabs="!isProd ? showOnProd : pageTabs" />
				<div v-if="$route.fullPath.includes('charges')" class="flex items-center gap-2 border-t p-2">
					<router-link v-for="n,i in chargesTab" :key="i" :to="n.route"
						class="text-xs text-[#ACAFAE] font-medium py-2 px-3 rounded-lg"
						active-class="charge_active" :class="n.active ? 'charge_active' : ''"
					>
						{{ n.name }}
					</router-link>
				</div>
			</div>
		</template>
		<template v-if="$route.fullPath.includes('charges')" #actions>
			<div class="flex items-center gap-3">
				<button class="px-3 py-2 rounded-lg border border-dark text-dark text-sm font-medium" @click="useChargeModal().openCreateChargeTypes()">
					Add charge type
				</button>
				<button class="font-medium justify-center py-2 px-3 bg-black rounded-lg text-white" @click="useChargeModal().openCreateChargeConfigurations()">
					<!-- <img src="@/assets/icons/source/plus_black.svg" alt=""> -->
					Configure new charge
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useChargeModal } from '@/composables/core/modals'
const pageTabs = computed(() => {
	return [
		{
			name: 'Pricing control',
			path: '/configuration/pricing/pricing-control'
		},
		{
			name: 'Payment option display',
			path: '/configuration/pricing/payment-option'
		},
		{
			name: 'Additional charges',
			path: '/configuration/pricing/charges',
			active: useRoute().fullPath.includes('charges')
		}
	]
})

const showOnProd = computed(() => {
	return [
		{
			name: 'Additional charges',
			path: '/configuration/pricing/charges',
			active: useRoute().fullPath.includes('charges')
		}
	]
})

const chargesTab = computed(() => {
	return [
		{ name: 'Configure Charges', route: '/configuration/pricing/charges', active: useRoute().fullPath.includes('/configurations') },
		{ name: 'Charge Types', route: '/configuration/pricing/charges/types' }
		// {name: 'Charge Report', route: 'ChargesReport'},
	]
})

const isProd = computed(() => {
    return location.host === 'v3.admin.shuttlers.africa'
})
</script>

<style scoped>
.charge_active{
	color: #0DAC5C;
	background: #F4F5F4;
}
</style>
