<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="driverRating" :has-index="true">
			<template #header>
				<TableFilter :filter-type="{showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<p v-if="item.date" class="whitespace-nowrap">
					{{ moment(item.data.date_created).format('ll') }}
				</p>
				<div v-if="item.star" class="flex items-center gap-1 flex-wrap min-w-[80px]">
					<img v-for="n in item.data.star" :key="n" src="@/assets/icons/source/star_yellow.svg" class="w-4" alt="">
				</div>
				<div v-if="item.issues" class="flex flex-col gap-2">
					<p v-if="!item.data.issues?.length">
						N/A
					</p>
					<template v-else>
						<p v-for="n,i in item.data.issues" :key="i" class="min-w-[150px] text-xs font-medium text-dark">
							{{ n }}
						</p>
					</template>
				</div>
				<p v-if="item.trip_time" class="whitespace-nowrap">
					{{ item.data?.trip_time || 'N/A' }}
				</p>
				<p v-if="item.comment" class="whitespace-nowrap">
					{{ item.data?.comment || 'N/A' }}
				</p>
				<p v-if="item.route" class="min-w-[150px] py-2">
					{{ item.data?.route || 'N/A' }}
				</p>
				<div v-if="item.attachment" class="flex flex-col gap-2">
					<p v-if="!item.data.attachment_urls?.length">
						None
					</p>
					<template v-else>
						<a v-for="n,i in item.data.attachment_urls" :key="i" :href="n" target="_blank" class="min-w-[150px] text-xs font-medium text-dark">
							{{ n }}
						</a>
					</template>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useDriverRating } from '@/composables/modules/drivers'
const { getDriverRating, loading, driverRating, moveTo, next, prev, total, page, onFilterUpdate } = useDriverRating()
const id = useRoute().params.id as string

getDriverRating()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    { text: 'Date', value: 'date' },
	{ text: 'Passenger name', value: 'passenger_name' },
	{ text: 'Rating', value: 'star' },
	{ text: 'Comment', value: 'comment' },
	{ text: 'Issues', value: 'issues' },
	{ text: 'Attachment', value: 'attachment' },
	{ text: 'Trip time', value: 'trip_time' },
	{ text: 'Route', value: 'route' }
])

</script>

<style scoped></style>
