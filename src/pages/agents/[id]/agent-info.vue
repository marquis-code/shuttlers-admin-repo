<template>
	<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
		<div class="lg:w-7/12 bg-white rounded-md shadow-sm p-3">
			<ModulesAgentsInformationDetails v-if="!loading" :selected-user="selectedAgent" />
			<Skeleton v-else height="600px" />
		</div>
		<div class="lg:w-5/12">
			<!-- <ModulesUsersWallet v-if="!loading" :selected-user="selectedAgent" :corporate-wallet-limit-usage-info="corporateWalletInfo" :corporate-wallet-details="corporateWalletDetails" />
			<Skeleton v-else height="300px" /> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAgentIdDetails } from '@/composables/modules/agents/id'

const id = String(useRoute().params.id)

const { selectedAgent, getAgentById, loading } = useAgentIdDetails()

	getAgentById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const openDropdown = ref(false)
</script>

<style scoped>
</style>
