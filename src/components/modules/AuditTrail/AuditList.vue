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
						View staff audit only
					</p>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div>
					<date-picker v-model:value="auditDateFilter" range class="font-light"
						placeholder="Filter by date" style="width: 80%" />
				</div>
				<div>
					<button class="flex items-center cursor-pointer gap-x-2" @click="onFilter({type:'download', value:null})">
						<img src="@/assets/icons/source/download.svg" alt="" class="inline">
						<p class="text-xs font-medium">
							Download report
						</p>
					</button>
				</div>
			</div>
		</div>
		<div class="border rounded-md bg-white">
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
						<span v-if="item?.eventDate === activeActivity?.eventDate" class="block border-2 border-shuttlersGreen  my-3 ml-2" />
						<div class="flex justify-between items-center gap-x-2  py-2 space-x-3 px-3 w-full">
							<div class="w-2/12 flex justify-start items-start">
								<p class="font-light text-gray-900 text-xs">
									{{ useDateFormat(item?.eventDate, "MMMM d, YYYY, hh:mm A").value }}
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useHandleFeatureFlaggedAudits, useFeatureFlaggedAudits } from '@/composables/modules/staffs/fetch'
const { featureFlagAudits, loading, prePopulateFeatureForm } = useHandleFeatureFlaggedAudits()
const { getFeatureFlaggedAudits, loading: loadingAuditStatus, featureFlaggedAuditStatus } = useFeatureFlaggedAudits()
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

const props = defineProps({
	auditsList: {
        type: Array,
        required: true,
		default: () => []
    }
})

const emit = defineEmits(['filter', 'selectedAudit'])

type FilterKeys = 'type' | 'value'
const onFilter = (data: Record<FilterKeys, string>) => {
	emit('filter', data)
}

const showColoredStroke = ref(false)

const auditDateFilter = ref('')

const activeActivity = ref('')

const setActive = (item) => {
	activeActivity.value = item
    emit('selectedAudit', item)
 if (item.eventDate === activeActivity.value?.eventDate) {
   showColoredStroke.value = true
 } else {
	showColoredStroke.value = false
 }
}
</script>

<style></style>
