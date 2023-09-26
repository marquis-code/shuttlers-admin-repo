<template>
	<main class="">
		<p class="border-t border-x py-3 rounded-t-lg pl-5 font-medium">
			Reward History
		</p>
		<Table :headers="tableFields" :table-data="tableData">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:false, showDownloadButton: false, showStatus: false, showDatePicker: false}">
					{{ item.data }}
					<template #item="{ item }">
						<div v-if="item.point">
							<span :class="[item.data.point === 'success' ? 'text-shuttlersGreen' : 'text-black']">{{ item.data.point }}ssss</span>
						</div>
					</template>
				</TableFilter>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'DATE ADDED',
        value: 'date'
    },
    {
        text: 'TIME',
        value: 'time'
    },
    {
        text: 'DESCRIPTION',
        value: 'description'
    },
    {
        text: 'POINT',
        value: 'point'
    },
    {
        text: 'POINT VALUE',
        value: 'point_value'
    }
])

const tableData = ref([
    {
        date: 'June 10th, 2022',
        time: '10:00 AM',
		description: 'New point',
		point: '+10 points',
		point_value: 'N/A',
        status: 'success'
    },
    {
        date: 'June 10th, 2022',
        time: '10:00 AM',
		description: 'New point',
		point: '+10 points',
		point_value: 'N/A',
        status: 'failure'
    },
    {
        date: 'June 10th, 2022',
        time: '10:00 AM',
		description: 'New point',
		point: '+10 points',
		point_value: 'N/A',
        status: 'success'
    },
    {
        date: 'June 10th, 2022',
        time: '10:00 AM',
		description: 'New point',
		point: '+10 points',
		point_value: 'N/A',
        status: 'failure'
    }
])

</script>

<style scoped></style>
