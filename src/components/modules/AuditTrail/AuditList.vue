<template>
	<div class="lg:w-7/12 space-y-16">
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="border rounded-md  bg-white px-6 py-2 flex items-center space-x-2">
					<span>Filter</span> <img src="@/assets/icons/source/add.svg" alt="" class="">
				</div>
				<div class="flex items-center gap-x-2">
					<div v-if="!loading">
						<label for="AcceptConditions" class="relative h-8 w-14 cursor-pointer">
							<input id="AcceptConditions" v-model="auditStatus" type="checkbox" class="peer sr-only" @change="handleToggle">

							<span
								class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen"
							/>

							<span
								class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
							/>
						</label>
					</div>
					<p v-else class="text-sm">
						Loading...
					</p>
					<p class="font-medium text-sm">
						View staff audit only {{ auditList.length }}
					</p>
				</div>
			</div>
		</div>
		<!-- <div class="border rounded-md bg-white">
			<div class="border-b">
				<div class="flex items-center py-3 px-3 gap-x-20">
					<p class="text-gray-600 font-medium">
						Time
					</p>
					<p class="text-gray-600 font-medium">
						Activity
					</p>
				</div>
			</div>
			<div>
				<div v-for="(item, index) in props.auditsList" :key="index" class="gap-x-3 cursor-pointer" @click="setActive(item)">
					<div class="flex w-full" :class="[item?.description === activeActivity ? 'h-16' : 'h-16']">
						<span v-if="item?.id === activeActivity?.id" class="block border-2 border-shuttlersGreen  my-3 ml-2" />
						<div class="flex justify-between items-center gap-x-2  py-2 space-x-3 px-3 w-full">
							<div class="w-2/12 flex justify-start items-start">
								<p class="text-gray-900 font-semibold text-xs">
									{{ item?.eventDate }}
								</p>
							</div>
							<div class="w-10/12 flex justify-start items-start">
								<p class="text-gray-600 text-sm ">
									{{ item?.description }}
								</p>
							</div>
							<div>
								<img src="@/assets/icons/source/greater.svg" alt="" class="">
							</div>
						</div>
					</div>
					<div class="w-full border-[0.4px]" />
				</div>
			</div>
		</div> -->
		<Table
			:loading="loading_audits"
			:has-index="true"
			:headers="tableFields"
			:table-data="auditList"
			:has-options="true"
			:page="page"
			:option="onRowClicked"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showDownloadButton: true,
						showDateRange: true,
					}"
					@filter="() => {}"
				/>
			</template>
			<template #sub_header>
				<div class="flex items-stretch gap-3">

				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.time" class="relative min-h-[50px] py-1 w-fit">
					<div v-if="moment().diff(moment(item.data.createdAt), 'hours') > 24" class="flex flex-col w-fit">
						<p class="text-black font-bold whitespace-nowrap">
							{{ moment(item.data.createdAt).format("Do MMM, YYYY") }}
						</p>
						<p>
							{{ moment(item.data.createdAt).format("h:mm A") }}
						</p>
					</div>
					<p v-else class="text-dark whitespace-nowrap font-bold w-fit">
						{{ moment(item.data.createdAt).fromNow() }}
					</p>
					<div v-if="activeActivity && item.data.id == activeActivity.id" class="absolute top-0 -left-14 h-[50px] w-[4px] bg-[#20E682]" />
				</div>
				<div v-if="item.activity" class="w-full flex items-center gap-2 justify-between min-w-[350px] py-1">
					<p>{{ item.data?.description || 'N/A' }}</p>
					<img src="@/assets/icons/source/greater.svg" alt="" class="">
				</div>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { useHandleFeatureFlaggedAudits, useFeatureFlaggedAudits } from '@/composables/modules/staffs/fetch'
import { useAudits } from '@/composables/modules/audits/fetch'
const { featureFlagAudits, loading, prePopulateFeatureForm } = useHandleFeatureFlaggedAudits()
const { getFeatureFlaggedAudits, loading: loadingAuditStatus, featureFlaggedAuditStatus } = useFeatureFlaggedAudits()
const { getAudits, loading: loading_audits, auditList, next, prev, moveTo, page, total } = useAudits()
getAudits()
getFeatureFlaggedAudits()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const auditStatus = ref(false)
const handleToggle = (e) => {
	const payload = {
		name: 'get-all-audits',
		active: e.target.value === 'on'
	}
	prePopulateFeatureForm(payload)
	featureFlagAudits()
}

onMounted(() => {
	auditStatus.value = featureFlaggedAuditStatus.value
})

const emit = defineEmits(['filter', 'selectedAudit'])

type FilterKeys = 'type' | 'value'
const onFilter = (data: Record<FilterKeys, string>) => {
	emit('filter', data)
}
const tableFields = ref([
	{ value: 'time', text: 'Time' },
	{ value: 'activity', text: 'Activity' }
])
const showColoredStroke = ref(false)

const auditDateFilter = ref('')

const activeActivity = ref('') as any

const onRowClicked = (item) => {
	activeActivity.value = item
    emit('selectedAudit', item)
 if (Number(item.id) === Number(activeActivity.value?.id)) {
   showColoredStroke.value = true
 } else {
	showColoredStroke.value = false
 }
}
</script>

<style></style>
