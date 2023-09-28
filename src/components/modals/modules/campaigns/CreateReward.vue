
import { formToJSON } from 'axios';
<template>
	<Modal
		modal="$atts.modal"
		title="Create Reward"
		:no-close-btn="true"
		class="text-center"
	>
		<div class="flex flex-col gap-y-4">
			<div class="field relative">
				<label for="amount" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Reward</label>
				<select v-model="form.reward" class="w-full rounded-md py-2.5 px-3 outline-none border text-sm">
					<option v-for="(item, index) in rewardsList" :key="index" :value="item.name">
						{{ item?.name }}
					</option>
				</select>
			</div>
			<div class="field relative">
				<label for="rewardValue" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Reward value (points)</label>
				<input id="rewardValue" v-model="form.point" autocomplete="true" placeholder="Enter points" type="number" class="input-field text-sm" required>
			</div>
			<div class="flex items-center space-x-3">
				<div>
					<label for="ActivateReward" class="relative h-8 w-14 cursor-pointer">
						<input id="ActivateReward" v-model="form.enable" :checked="form.enable" type="checkbox" class="peer sr-only">

						<span
							class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen"
						/>

						<span
							class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
						/>
					</label>
				</div>
				<p class="text-[#6E717C] font-[500] text-[12px] pb-3">
					{{ form.enable ? 'Disable' : 'Enable' }} reward
				</p>
			</div>

			<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="auth-form-btn font-[700] w-full py-3 text-white bg-[#000005]" @click="handleCreateReward">
				<span v-if="!processing" class="flex justify-center items-center gap-2.5">Create</span>
				<Spinner v-else />
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useCampaignModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { use_get_pilot_reward_list, use_create_reward } from '@/composables/modules/campaigns/fetch'
const { getPilotRewards, loadingPilotRewardList, rewardsList } = use_get_pilot_reward_list()
const { payloads, createReward, processing } = use_create_reward()
getPilotRewards()
const form = reactive({
	reward: '',
    point: '',
	enable: false
})

const isFormEmpty = computed(() => {
	return !!(form.reward && form.point)
})

const handleCreateReward = async () => {
	payloads.name.value = form.reward
	payloads.min_point.value = form.point
    payloads.status.value = form.enable ? 'active' : 'inactive'
	await createReward()
	useCampaignModal().closeCreateReward()
	await getPilotRewards()
	useAlert().openAlert({ type: 'SUCCESS', msg: 'Reward has been created successfully' })
}

</script>

<style>

</style>
