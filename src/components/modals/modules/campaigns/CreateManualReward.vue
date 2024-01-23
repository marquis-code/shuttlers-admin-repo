<template>
	<Modal
		modal="$atts.modal"
		title="Reward customers manually"
		:no-close-btn="true"
		class="text-center"
	>
		<form class="flex flex-col gap-y-4" @submit.prevent="create">
			<div class="field relative">
				<label for="rewardValue" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Event</label>

				<select v-if="!loadingPointsList" id="" v-model="credientials.event_name.value" class="input-field">
					<option value="">
						Select Event
					</option>
					<option v-for="item in pointsList" :key="item.id" :value="item.event_name">
						{{ item.event_name }}
					</option>
				</select>
				<Skeleton v-else height="46px" />
			</div>

			<div class="field relative">
				<label for="amount" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Customer</label>
				<InputMultiSelectUsers v-model="credientials.user.value" placeholder="Select Customer" />
			</div>

			<button :disabled="!isFormEmpty" class="auth-form-btn font-[700] w-full py-3 text-white bg-[#000005]">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">Create</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { use_get_pilot_point_list } from '@/composables/modules/campaigns/fetch'
import { useCreateManualReward } from '@/composables/modules/campaigns/create'
const { getPilotPoints, pointsList, loadingPointsList, page_size } = use_get_pilot_point_list()

getPilotPoints('user')

const { create, credientials, loading } = useCreateManualReward()

const isFormEmpty = computed(() => {
	return !!(credientials.user.value && credientials.event_name.value)
})

</script>

<style>

</style>
