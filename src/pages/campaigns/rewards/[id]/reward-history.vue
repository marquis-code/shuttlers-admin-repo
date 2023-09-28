<template>
	<main class="">
		<p class="border-t border-x py-3 rounded-t-lg pl-5 font-medium">
			Reward History
		</p>
		<Table :loading="loadingPilotRewardHistories" :headers="rewardHistoriesListTableFields" :table-data="rewardHistories">
			<template #item="{ item }">
				<div v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, 'MMMM d, YYYY').value ?? 'N/A' }}
				</div>
				<div v-if="item.updated_at">
					{{ useDateFormat(item.data.updated_at, 'hh:mm A').value ?? 'N/A' }}
				</div>
				<div v-if="item.points" :class="[item.data.action === 'reward' ? 'text-shuttlersGreen' : 'text-rose-600']" class="font-[500]">
					{{ item.data.action === 'reward' ? `+${item.data.points}` : item.data.points }}
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { use_get_pilot_histories_by_id } from '@/composables/modules/campaigns/fetch'
const route = useRoute()
console.log(route, 'route here')
const { getPilotRewardsHistories, loadingPilotRewardHistories, rewardHistories } = use_get_pilot_histories_by_id()
const userType = 'driver'
const userId = Number(route.params.id)
getPilotRewardsHistories(userType, userId)
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

console.log(rewardHistories, 'reward histories here')

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

const onRowClicked = (data) => {
	// const { selectedUser } = useUserIdDetails()
	useRouter().push(`/users/${data.id}/user-info`)
	selectedUser.value = data
}
</script>

<style scoped></style>
