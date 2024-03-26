<template>
	<main class="space-y-10">
		<!-- <ButtonGoBack class="mb-6" /> -->
		<div class="text-center bg-black h-12 text-sm text-white flex justify-center items-center">
			Current customer point rate: 1 point ~ {{ loading_points_rate ? 'loading...' : convertToCurrency(pointsRateObject?.value) }}
		</div>
		<div>
			<div class="container mx-auto">
				<div class="overflow-x-auto">
					<Table :loading="loadingPointsList" :headers="tableFields" :table-data="computedPointsList">
						<template #header>
							<div class="flex justify-between items-center px-4 py-2 border">
								<p class="text-[#101828] font-[400] leading-[28px] text-sm">
									Configure customers reward point.
								</p>
								<div class="lg:flex items-center gap-x-3 space-y-4 lg:space-y-0">
									<button class="bg-black text-white text-xs py-[10px] px-[16px] w-full lg:w-max rounded-md" @click="useCampaignModal().openConfigurePoints()">
										Configure point
									</button>
								</div>
							</div>
						</template>
						<template #item="{ item }">
							<div v-if="item.point">
								<div v-if="lookupTable[item.data.id]">
									<input v-model="item.data.point" class="border outline-none h-8 w-16 text-center">
								</div>
								<p v-else>
									{{ item.data.point === 0 ? 'N/A' : item.data.point }} {{ item.data.point ? 'Points' : '' }}
								</p>
							</div>
							<div v-if="item.value">
								<p>
									{{ item.data.value === 0 ? 'N/A' : convertToCurrency(item.data.value) }}
								</p>
							</div>
							<div v-if="item.action" class="flex items-center gap-x-4 w-full">
								<button :class="[!lookupTable[item.data.id] ? 'bg-[#4848ED]' : 'bg-black']" class="text-white text-xs py-2 txet-xs rounded-md w-1/2" @click="handleEdit(item.data, lookupTable[item.data.id])">
									{{ !lookupTable[item.data.id] ? 'Edit' : 'Save' }}
								</button>
								<div class="w-full">
									<button v-if="!lookupTable[item.data.id]" :disabled="item.data.points === 0" :class="[item.data.points === 0 ? 'opacity-25 cursor-not-allowed' : null]" @click="handleDelete(item.data)">
										<img src="@/assets/icons/source/delete.svg" alt="delete icon">
									</button>
									<button v-else class="text-black font-medium" @click="lookupTable[item.data.id] = false">
										Cancel
									</button>
								</div>
							</div>
						</template>
						<!-- <template #footer>
							<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
						</template> -->
					</Table>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { useCampaignModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { use_get_pilot_point_list, use_edit_point, use_get_points_rate } from '@/composables/modules/campaigns/fetch'
const { getPilotPoints, loadingPointsList, pointsList, page, total, moveTo, next, prev } = use_get_pilot_point_list()
const { payloads, editPoint, loading } = use_edit_point()
const { getPilotPointsRate, loading_points_rate, pointsRateObject } = use_get_points_rate()
const userType = 'user'
getPilotPoints(userType)
getPilotPointsRate(userType)
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const computedPointsList = computed(() => {
	if (!pointsList.value.length) return []
	return pointsList.value.map((item, index) => {
	return {
	...item,
	tableIndex: index + 1,
	event: item?.event_name,
	point: item?.points,
	value: item?.points * 50,
	action: ''
   }
})
})

const tableFields = ref([
    {
        text: 'S/N',
        value: 'tableIndex'
    },
    {
        text: 'EVENT',
        value: 'event'
    },
    {
        text: 'POINT',
        value: 'point'
    },
    {
        text: 'ACTION',
        value: 'action'
    }
])

const lookupTable = ref(pointsList.value.reduce((agg, item) => ({ ...agg, [item.id]: false }), {}))

const handleEdit = async (item, action) => {
	if (!action) {
		lookupTable.value[item.id] = true
	} else {
		payloads.min_point.value = item?.point
		payloads.name.value = item.event_name
		await editPoint(item.id)
		getPilotPoints(userType)
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Points was updated successfully' })
		lookupTable.value[item.id] = false
	}
}

const handleDelete = async (item) => {
		const { payloads, editPoint, loading } = use_edit_point()
		payloads.min_point.value = ''
		payloads.name.value = item.event_name
		await editPoint(item.id)
		getPilotPoints(userType)
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Point was deleted successfully' })
}

</script>

<style scoped></style>
