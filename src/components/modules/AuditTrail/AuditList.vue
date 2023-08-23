<template>
	<div class="lg:w-7/12 space-y-16">
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="border rounded-md  bg-white px-6 py-2 flex items-center space-x-2">
					<span>Filter</span> <img src="@/assets/icons/add.svg" alt="" class="">
				</div>
				<div class="flex items-center gap-x-2">
					<div>
						<label for="AcceptConditions" class="relative h-8 w-14 cursor-pointer">
							<input id="AcceptConditions" type="checkbox" class="peer sr-only">

							<span
								class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
							/>

							<span
								class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
							/>
						</label>
					</div>
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
				<div v-for="(item, index) in audits" :key="index" class="gap-x-3 cursor-pointer" @click="setActive(item)">
					<div class="flex w-full" :class="[item.activity === activeActivity ? 'h-16' : 'h-16']">
						<span v-if="item.activity === activeActivity" class="block border border-green-500  my-3 ml-2" />
						<div class="flex justify-between items-center  py-2 space-x-3 px-3 w-full">
							<p class="font-medium text-gray-900 text-sm   w-2/12">
								{{ item.time }}
							</p>
							<p class="text-gray-600 text-sm  w-10/12">
								{{ item.activity }}
							</p>
							<div>
								<img src="@/assets/icons/greater.svg" alt="" class="">
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
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

// const props = withDefaults(defineProps<{
//    audits: Array<any>
// }>(), {})

const emit = defineEmits(['filter', 'selectedAudit'])

type FilterKeys = 'type' | 'value'
const onFilter = (data: Record<FilterKeys, string>) => {
	emit('filter', data)
}

const audits = ref([
	{
		time: '6 minutes ago',
		activity: 'grace with email address grace.obasi@shuttlers.ng requested to get all users',
        actor: 'Efetobor Otivhia',
        email: 'eotivhia@valefinance.com',
        ipAddress: '192.168.17.242',
        dateAndTime: '22nd August, 2023 10:34 PM',
        type: 'Normal'
	},
	{
		time: '3 minutes ago',
		activity: 'Nsikan requested a user\'s data user email: hollansikan@gmail.com',
        actor: 'Efetobor Otivhia',
        email: 'eotivhia@valefinance.com',
        ipAddress: '192.168.17.242',
        dateAndTime: '22nd August, 2023 10:34 PM',
        type: 'Normal'
	},
	{
		time: '5 minutes ago',
		activity: 'Iniekom requested a user\'s data user email: inileo48@gmail.com',
        actor: 'Efetobor Otivhia',
        email: 'eotivhia@valefinance.com',
        ipAddress: '192.168.17.242',
        dateAndTime: '22nd August, 2023 10:34 PM',
        type: 'Normal'
	}
])

const showColoredStroke = ref(false)

const auditDateFilter = ref('')

const activeActivity = ref('')

const setActive = (item) => {
	activeActivity.value = item
    emit('selectedAudit', item)
 if (item === activeActivity.value) {
   showColoredStroke.value = true
 } else {
	showColoredStroke.value = false
 }
}
</script>

<style></style>
