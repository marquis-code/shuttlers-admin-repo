<template>
	<main class="">
		<Table
			:loading="loading"
			:headers="tableFields"
			:table-data="sortedDemoRequest"
		>
			<!-- <template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template> -->

			<template #item="{ item }">
				<span v-if="item.contact_fname" class="flex items-center gap-4">
					<span
					>{{ item.data.contact_fname }} {{ item.data.contact_lname }}</span
					>
				</span>

				<span v-else-if="item.created_at">
					{{ moment.utc(item.data.created_at).format("Do MMMM, YYYY") }}
				</span>
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
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useGetDemoRequest } from '@/composables/modules/corporates/fetch'

const {
  getCorporatesDemoRequest,
  loading,
  corporatesList,
  moveTo,
  next,
  prev,
  total,
  page
} = useGetDemoRequest()
getCorporatesDemoRequest()

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

const sortedDemoRequest = computed(() => {
  return corporatesList.value.map((itm:any) => {
    return {
      ...itm,
      requestDate: itm.created_at.split(' ')[0]
    }
  }).sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
})
const tableFields = ref([
  {
    text: 'FULL NAME',
    value: 'contact_fname'
  },
  {
    text: 'Email',
    value: 'corporate_email'
  },
  {
    text: 'PHONE NUMBER',
    value: 'corporate_phone'
  },
  {
    text: 'COMPANY NAME',
    value: 'corporate_name'
  },
  {
    text: 'STAFF STRENGTH',
    value: 'staff_strength'
  },
  {
    text: 'REQUEST DATE',
    value: 'created_at'
  }
])
</script>

<style scoped></style>
