<template>
	<ButtonGoBack v-if="!AgentByIdloading" class="my-4" url="/agents" />
	<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0 mt-8">
		<div class="lg:w-7/12 bg-white rounded-md shadow-sm p-3">
			<ModulesAgentsInformationDetails v-if="!AgentByIdloading" :selected-user="selectedAgent" />
			<Skeleton v-else height="600px" />
		</div>
		<div v-if="!AgentByIdloading" class="lg:w-5/12">
			<form class="card gap-4 flex flex-col" @submit.prevent="">
				<h1 class="card-header">
					Settlement account
				</h1>

				<div class="field relative">
					<label for="status">Bank name</label>
					<input id="user" type="text" name="user" class="input-field" :value="selectedAgent.bank_name" disabled>
				</div>
				<div class="field relative">
					<label for="status">Account number</label>
					<input id="user" type="text" name="user" class="input-field" :value="selectedAgent.account_number" disabled>
				</div>
				<div class="field relative">
					<label for="status">Account name</label>
					<input id="user" type="text" name="user" class="input-field" :value="selectedAgent.bank_account_name" disabled>
				</div>

				<!-- <div class="flex justify-end mt-12">
					<button class="btn-primary" type="submit"
						:disabled="AgentByIdloading || rentalDetails.status === 'rejected' || rentalDetails.status === 'cancelled' || rentalDetails?.userRoute?.booking_status === 'active'">
						<span v-if="!AgentByIdloading" class="flex justify-center items-center gap-2.5">
							Update request
						</span>
						<Spinner v-else />
					</button>
				</div> -->
			</form>
		</div>

		<Skeleton v-else height="400px" />
	</div>
</template>

<script setup lang="ts">
import { useAgentIdDetails } from '@/composables/modules/agents/id'

const id = useRoute().params.id as string

const { getAgentById, AgentByIdloading, selectedAgent } = useAgentIdDetails()

getAgentById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const openDropdown = ref(false)
</script>

<style scoped>
</style>
