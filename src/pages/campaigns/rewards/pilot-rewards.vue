<template>
	<main class="space-y-10">
		<div class="text-center bg-black h-12 text-sm text-white flex justify-center items-center">
			Current pilots point rate: 1 point ~  {{ loading_points_rate ? 'loading...' : convertToCurrency(pointsRateObject?.value) }}
		</div>
		<div>
			<div class="container mx-auto space-y-3">
				<div class="lg:flex justify-between items-center px-4 py-2 border rounded-lg space-y-4 lg:space-y-0">
					<div class="flex border border-gray-300 rounded-lg h-10">
						<button :class="[activeTab === 'leaderboard' ? 'bg-gray-200 text-[#364152]' : 'bg-white text-[#101828]']" class="font-[500] w-full lg:w-max rounded-l-lg leading-[28px] text-center flex justify-center items-center text-xs px-3 py-2" @click="activeTab = 'leaderboard'">
							Pilots Leaderboard
						</button>
						<p class="h-2 border-gray-500" />
						<button :class="[activeTab === 'list' ? 'bg-gray-200 text-[#364152]' : 'bg-white text-[#101828]']" class="font-[500] w-full lg:w-max leading-[28px] text-xs text-center flex justify-center items-center  rounded-r-lg px-3 py-2" @click="activeTab = 'list'">
							Reward list
						</button>
					</div>
					<div class="flex items-center gap-x-3">
						<button class="bg-black text-white w-full lg:w-max text-xs py-[10px] px-[16px] rounded-md" @click="useCampaignModal().openCreateReward()">
							Create reward
						</button>
					</div>
				</div>
				<div v-if="activeTab === 'list'" class="overflow-x-auto border-[0.4px] rounded-lg">
					<Table :loading="loadingPilotRewardList" :headers="rewardListTableFields" :table-data="computedPilotRewardList">
						<template #item="{ item }">
							<div v-if="item.min_point">
								{{ item.data.min_point ?? 'N/A' }}
							</div>
							<div v-if="item.action" class="flex items-center gap-x-2 w-full">
								<div class="flex items-center gap-x-3">
									<div>
										<label :for="item.data.name" class="relative h-8 w-14 cursor-pointer">
											<input :id="item.data.name" :name="item.data.name" :checked="item.data.status === 'active' ? true : false" type="checkbox" class="peer sr-only" @change="handleEdit($event, item.data)">

											<span
												class="absolute inset-0 rounded-full green bg-gray-300 transition peer-checked:bg-green09"
											/>

											<span
												class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
											/>
										</label>
									</div>
									<button @click="handleDelete(item.data)">
										<img src="@/assets/icons/source/delete.svg" class="mb-3" alt="delete icon">
									</button>
								</div>
							</div>
						</template>
						<template #footer>
							<TablePaginator :current-page="rewardPageCount" :total-pages="totalReward" :loading="loadingPilotRewardList" @move-to="rewardMoveTo($event)" @next="rewardNext" @prev="rewardPrev" />
						</template>
					</Table>
				</div>

				<div v-if="activeTab === 'leaderboard'" class="space-y-6">
					<div v-if="!loading_pilot_rate_points" class="lg:flex w-full gap-x-10 space-y-6 lg:space-y-0">
						<div class="rounded-lg space-y-6 bg-white p-6 border-[0.4px] lg:w-4/12">
							<p class="text-[#6E717C] font-light text-xs">
								HIGHEST PILOT POINT
							</p>
							<h1 class="text-[#000005] font-[700] text-lg leading-[20px]">
								{{ computedPointData.highest_score ?? 'N/A' }} points
							</h1>
							<div class="flex justify-between items-center">
								<p class="text-[#667085] font-[400] text-xs">
									Pilot
								</p>
								<NuxtLink :to="`/drivers/${computedPointData.highest_piolt_id}/driver-info`" class="underline text-[#4848ED] font-[700] text-xs">
									{{ computedPointData.highest_piolt ?? 'N/A' }}
								</NuxtLink>
							</div>
						</div>
						<div class="rounded-lg space-y-6 bg-white p-6 border-[0.4px] lg:w-4/12">
							<p class="text-[#6E717C] font-light text-xs">
								LOWEST PILOT POINT
							</p>
							<h1 class="text-[#000005] font-[700] text-lg leading-[20px]">
								{{ computedPointData.lowest_score ?? 'N/A' }} points
							</h1>
							<div class="flex justify-between items-center">
								<p class="text-[#667085] font-[400] text-xs">
									Pilot
								</p>
								<NuxtLink :to="`/drivers/${computedPointData.lowest_piolt_id}/driver-info`" class="underline text-[#4848ED] font-[700] text-xs">
									{{ computedPointData.lowest_pilot ?? 'N/A' }}
								</NuxtLink>
							</div>
						</div>
					</div>
					<div v-else class="lg:flex w-full gap-x-10 space-y-6 lg:space-y-0">
						<Skeleton v-for="i in 2" :key="i" height="200px" radius="3px" />
					</div>

					<div class="overflow-x-auto rounded-lg border-[0.4px]">
						<Table :loading="loadingLeaderboardPointsList" :headers="leaderboardListTableFields" :table-data="computedPilotLeaderboardList" :option="onRowClicked">
							<template #item="{ item }">
								<div v-if="item.driver">
									<NuxtLink class="font-medium underline text-[#4848ED]" :to="`/campaigns/rewards/${item?.data?.user_id}/reward-history`">
										{{ `${item?.data?.driver?.fname} ${item?.data?.driver?.lname}` ?? 'N/A' }}
									</NuxtLink>
								</div>
								<div v-if="item.current_point">
									<span>{{ item?.data?.current_point ?? 'N/A' }}</span>
								</div>

								<div v-if="item.points_earned">
									<span>{{ item?.data?.points_earned ?? 'N/A' }}</span>
								</div>
							</template>
							<template #footer>
								<TablePaginator :current-page="leaderboardPageCount" :total-pages="leaderboardTotal" :loading="loadingLeaderboardPointsList" @move-to="moveTo($event)" @next="leaderboardNext" @prev="leaderboardPrev" />
							</template>
						</Table>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { useCampaignModal } from '@/composables/core/modals'
import { use_get_pilot_hightest_lowest_points, use_get_pilot_reward_list, use_get_leaderboard_point_list, use_update_reward, use_delete_reward, use_get_points_rate } from '@/composables/modules/campaigns/fetch'
import { useAlert } from '@/composables/core/notification'
const { getPointsRate, loading_pilot_rate_points, pointsObject } = use_get_pilot_hightest_lowest_points()
const { getPilotRewards, loadingPilotRewardList, rewardsList, next: rewardNext, prev: rewardPrev, moveTo: rewardMoveTo, total: totalReward, page: rewardPageCount } = use_get_pilot_reward_list()
const { getLeaderboardPointsList, loadingLeaderboardPointsList, leaderboardPointsList, next: leaderboardNext, prev: leaderboardPrev, moveTo, total: leaderboardTotal, page: leaderboardPageCount } = use_get_leaderboard_point_list()
const { payloads: deletePayload, deleteReward, processingDelete } = use_delete_reward()
const { payloads, editReward } = use_update_reward()
const { getPilotPointsRate, loading_points_rate, pointsRateObject } = use_get_points_rate()
const userType = 'driver'
getPointsRate(userType)
getPilotRewards(userType)
getLeaderboardPointsList(userType)
getPilotPointsRate(userType)
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const computedPointData = computed(() => {
	return ({
		highest_score: pointsObject.value?.highest?.points_earned,
		highest_piolt: `${pointsObject.value?.highest.driver?.fname} ${pointsObject.value?.highest?.driver?.lname}`,
		highest_piolt_id: pointsObject.value?.highest.driver?.id,
		lowest_pilot: `${pointsObject.value?.lowest.driver?.fname} ${pointsObject.value?.lowest?.driver?.lname}`,
		lowest_piolt_id: pointsObject.value?.lowest.driver?.id,
		lowest_score: pointsObject.value?.lowest?.points_earned
	})
})

const computedPilotRewardList = computed(() => {
	if (!rewardsList.value.length) return []
	return rewardsList.value.map((item, index) => {
		return {
			...item,
			tableIndex: index + 1,
			action: ''
		}
	}).filter((itm) => {
    return itm.min_point !== null
})
})

const computedPilotLeaderboardList = computed(() => {
	if (!leaderboardPointsList.value.length) return []
	return leaderboardPointsList.value.sort((p1, p2) => p1.points_earned - p2.points_earned).map((item, index) => ({ ...item, tableIndex: index + 1, action: '' }))
})

const activeTab = ref('leaderboard')

const rewardListTableFields = ref([
	{
		text: 'S/N',
        value: 'tableIndex'
    },
    {
		text: 'REWARD',
        value: 'name'
    },
    {
        text: 'POINT',
        value: 'min_point'
    },
    {
		text: 'STATUS',
        value: 'status'
    },
    {
		text: 'ACTION',
        value: 'action'
    }
])

const leaderboardListTableFields = ref([
	{
		text: 'S/N',
        value: 'tableIndex'
    },
    {
		text: 'PILOT',
        value: 'driver'
    },
    {
		text: 'TOTAL POINTS',
        value: 'points_earned'
    },
    {
		text: 'CURRENT POINT',
        value: 'current_point'
    }
])

const lookupTable = ref(computedPilotRewardList.value.reduce((agg, item) => ({ ...agg, [item.id]: item?.status === 'active' }), {}))

const handleEdit = async (e, item) => {
	const isChecked = e?.target?.checked
	if (isChecked) {
		lookupTable.value[item.id] = true
		payloads.name.value = item.name
		payloads.status.value = 'active'
	    await editReward(item.id)
		getPilotRewards(userType)
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Reward status was activated successfully' })
	}
	if (!isChecked) {
		lookupTable.value[item.id] = false
		payloads.name.value = item.name
		payloads.status.value = 'inactive'
	    await editReward(item.id)
		getPilotRewards(userType)
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Reward status was inactivated successfully' })
	}
}

const handleDelete = async (item) => {
	deletePayload.name.value = item.name
	await deleteReward()
	getPilotRewards(userType)
	useAlert().openAlert({ type: 'SUCCESS', msg: 'Reward was sucessfully deleted!' })
}

const onRowClicked = (data) => {
	useRouter().push({
        path: `/campaigns/rewards/${data.user_id}/reward-history`,
        query: { userType: 'driver' }
      })
}
</script>

<style scoped></style>
