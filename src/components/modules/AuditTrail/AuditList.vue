<template>
	<div class="lg:w-7/12 space-y-8">
		<div class="space-y-3 relative">
			<div class="flex items-center justify-between">
				<button class="flex items-center gap-3 p-2 px-4 bg-light text-dark border text-sm rounded-md" @click="filter = true">
					Filter
					<Icon name="plus" class="w-5" />
				</button>
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
						View staff audit only
					</p>
				</div>
			</div>

			<div class="flex gap-2 flex-wrap">
				<p v-for="n, index in selectedType" :key="index" class="flex bg-[#EFF2F7] gap-2 items-center text-xs rounded py-1 px-2">
					{{ n }}
					<Icon name="closed" class="w-4 text-red cursor-pointer" @click="adjustTypeFilter(n.toLowerCase())" />
				</p>
			</div>

			<div v-if="selectedAdmin.length" class="flex gap-2 flex-wrap">
				<p v-for="n, index in selectedAdmin" :key="index" class="flex bg-[#EFF2F7] gap-2 items-center rounded py-1 px-2 text-xs">
					{{ n?.fname || '' }} {{ n?.lname || '' }}
					<Icon name="closed" class="w-4 text-red cursor-pointer" @click="adjustActorFilter(n)" />
				</p>
			</div>

			<div v-if="selectedOperationType.length" class="flex gap-2 flex-wrap">
				<p v-for="n, index in selectedOperationType" :key="index" class="flex bg-[#EFF2F7] gap-2 items-center rounded py-1 px-2 text-xs">
					{{ Capitalize(cleanString(n)) }}
					<Icon name="closed" class="w-4 text-red cursor-pointer" @click="adjustOperationTypeFilter(n)" />
				</p>
			</div>

			<div ref="target">
				<div v-if="filter" class="absolute filter_pos bg-light p-2 border rounded flex flex-col">
					<button class="filter text-left bg-transparent p-2 border-0" @click="openTypeFilter">
						Type
					</button>
					<button class="filter text-left bg-transparent p-2 border-t" @click="openActorFilter">
						Actor
					</button>
					<button class="filter text-left bg-transparent p-2 border-t" @click="openOperationTypeFilter">
						Operation type
					</button>
				</div>

				<div v-if="typeStatus" class="absolute bg-light type_pos p-2 border rounded flex flex-col">
					<div v-for="n in allTypes" :key="n" class="flex items-center p-2 gap-2 w-fit">
						<input :id="n" :checked="selectedType.includes(n.toLowerCase())" type="checkbox" @change="adjustTypeFilter(n.toLowerCase())">
						<label :for="n" class="text-sm m-0 text-dark cursor-pointer">{{ n }}</label>
					</div>
				</div>
				<div v-if="actorStatus" class="bg-light absolute type_pos border rounded d-flex flex-column ">
					<div class="p-3 border-bottom ">
						<input v-model="searchText" type="text" class="w-full border-0 outline-none" placeholder="Search...">
					</div>
					<div class="p-3 bg-light overflow-auto max-h-[200px]">
						<div v-for="n, index in filteredAdmin" :key="index" class="flex items-center p-2 gap-2">
							<input :id="n.id" :checked="selectedAdminIds.includes(n.id)" type="checkbox" @change="adjustActorFilter(n)">
							<label :for="n.id" class="text-sm m-0 text-dark cursor-pointer">{{ `${n.fname} ${n.lname}` }}</label>
						</div>
					</div>
				</div>
				<div v-if="operationTypeStatus" class="bg-light absolute type_pos border rounded d-flex flex-column ">
					<div class="p-3 border-bottom ">
						<input v-model="operationTypeSearch" type="text" class="w-full border-0 outline-none" placeholder="Search...">
					</div>
					<div class="p-3 bg-light overflow-auto max-h-[200px]">
						<div v-for="n, index in filteredOperationTypes" :key="index" class="flex items-center p-2 gap-2">
							<input :id="n" :checked="selectedOperationType.includes(n)" type="checkbox" @change="adjustOperationTypeFilter(n)">
							<label :for="n" class="text-sm m-0 text-dark cursor-pointer">{{ cleanString(n) }}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
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
					@filter="onFilterUpdate"
					@download="downloadAllAudits"
				/>
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
					<div v-if="details && item.data.id === details?.id" class="absolute top-0 -left-14 h-[50px] w-[4px] bg-[#20E682]" />
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
import { onClickOutside } from '@vueuse/core'
import { useHandleFeatureFlaggedAudits, useFeatureFlaggedAudits } from '@/composables/modules/staffs/fetch'
import { useAudits, useAuditFilter, useViewAuditDetails } from '@/composables/modules/audits'
import { Capitalize } from '@/composables/utils/formatter'
import { isProdEnv } from '@/composables/utils/system'

const { featureFlagAudits, loading, prePopulateFeatureForm } = useHandleFeatureFlaggedAudits()
const { getFeatureFlaggedAudits, loading: loadingAuditStatus, featureFlaggedAuditStatus } = useFeatureFlaggedAudits()
const { getAudits, loading: loading_audits, auditList, next, prev, moveTo, page, total, getAllAdmins, downloadAllAudits, onFilterUpdate, getAuditOperationType, auditOperationTypes } = useAudits()
const { filter, typeStatus, actorStatus, allTypes, selectedType, selectedAdmin, selectedAdminIds, searchText, closeAllFilterBox, openTypeFilter, openActorFilter, adjustTypeFilter, adjustActorFilter, filteredAdmin, operationTypeSearch, operationTypeStatus, openOperationTypeFilter, adjustOperationTypeFilter, filteredOperationTypes, selectedOperationType, cleanString } = useAuditFilter()
const { showDataDetails, details } = useViewAuditDetails()

const emit = defineEmits(['filter', 'selectedAudit'])
const target = ref(null)
const auditStatus = ref(false)
const tableFields = ref([
	{ value: 'time', text: 'Time' },
	{ value: 'activity', text: 'Activity' }
])

const handleToggle = (e:Record<string, any>) => {
	const payload = {
		name: 'get-all-audits',
		active: e.target.value === 'on'
	}
	prePopulateFeatureForm(payload)
	featureFlagAudits()
}
onClickOutside(target, () => {
	closeAllFilterBox()
})
const onRowClicked = (item) => {
	showDataDetails(item)
}

getAudits()
getFeatureFlaggedAudits()
getAllAdmins()
getAuditOperationType()
onMounted(() => {
	auditStatus.value = featureFlaggedAuditStatus.value
})
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
.filter_pos {
	top: 60px;
	left: 25px;
	min-width: 150px;
	z-index: 30;
}

.type_pos {
	top: 70px;
	left: 180px;
	min-width: 150px;
	z-index: 30;
}
</style>
