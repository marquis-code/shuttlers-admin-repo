<template>
	<main class="">
		<ButtonGoBack :url="backUrl" class="mb-3" />
		<p class="border-t border-x py-3 rounded-t-lg pl-5 font-medium">
			Reward History
		</p>
		<Table :loading="loadingPilotRewardHistories" :headers="rewardHistoriesListTableFields" :table-data="rewardHistories">
			<template #item="{ item }">
				<div v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, 'MMMM D, YYYY').value ?? 'N/A' }}
				</div>
				<div v-if="item.updated_at">
					{{ useDateFormat(item.data.updated_at, 'hh:mm A').value ?? 'N/A' }}
				</div>
				<div v-if="item.points" :class="[item.data.action === 'reward' ? 'text-shuttlersGreen' : 'text-rose-600']" class="font-[500]">
					<span>{{ item.data.action === 'reward' ? `${item.data.points === 0 ? '0' : `+${item.data.points}`}` : `${item.data.points === 0 ? '0' : `+${item.data.points}`}` }}</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingPilotRewardHistories" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { use_get_pilot_histories_by_id } from '@/composables/modules/campaigns/fetch'
const route = useRoute()
const { getPilotRewardsHistories, userId, userType, loadingPilotRewardHistories, rewardHistories, total, next, prev, page, moveTo } = use_get_pilot_histories_by_id()
userId.value = Number(route.params.id)
userType.value = route.query.userType as string
getPilotRewardsHistories()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const rewardHistoriesListTableFields = ref([
	{
		text: 'DATE ADDED',
        value: 'created_at'
    },
    {
		text: 'TIME',
        value: 'updated_at'
    },
    {
        text: 'DESCRIPTION',
        value: 'description'
    },
    {
		text: 'POINT',
        value: 'points'
    }
])

const backUrl = computed(() => {
	return useRoute().query.userType === 'driver' ? '/campaigns/rewards/pilot-rewards' : '/campaigns/rewards/customer-rewards'
})

</script>

<style scoped></style>
