<template>
	<main class="">
		<Table :loading="loadingUserRewardHistories" :headers="rewardHistoriesListTableFields" :table-data="rewardHistories">
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
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingUserRewardHistories" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetUserRewardsHistories } from '@/composables/modules/users/inner/rewards'

const { getUserRewardsHistories, loadingUserRewardHistories, rewardHistories, total, next, prev, page, moveTo } = useGetUserRewardsHistories()

const userId = useRoute().params.id as string
getUserRewardsHistories(userId)

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

</script>

<style scoped></style>
