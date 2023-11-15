<template>
	<main class="space-y-6">
		<div class="bg-white rounded-md border w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Create New Issue Category
				</p>
			</div>
			<hr>
			<div class="space-y-6 p-6 mt-5">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleBrand"
							class="text-sm font-light text-gray                                                                             ">
							Category name</label>
						<input v-model.trim="category.name" type="text" name="vehicleBrand"
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="vehicleName"
							class="text-sm font-light text-gray">Vehicle
							Issue type (Minimum of two issues)</label>
						<div class="flex items-center">
							<input v-model.trim="issueType" type="text" name="vehicleName"
								class="w-full outline-none px-3 py-2 rounded-l-md border focus:border-gray-900">
							<button
								class="text-white py-2 bg-black px-6 rounded-r-md"
								:disabled="!issueType"
								type="button"
								@click.prevent="addIssueToList"
							>
								Add
							</button>
						</div>
					</div>
				</div>
				<div
					v-if="category.issues.length"
					class="list-group list-unstyled"
				>
					<div
						v-for="(item, index) in category.issues"
						:key="index"
						class="px-0 py-1 d-flex justify-content-between"
					>
						{{ item }}
						<i
							class="fe fe-x text-danger pointer"
							@click="deleteIssueFromList(index)"
						/>
					</div>
				</div>
				<div>
					<button class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Create Category
					</button>
				</div>
			</div>
		</div>
		<Table :loading="loadingTripRatingSettingsCategories" :headers="tableFields" :table-data="tripRatingSettingsCategories" :has-options="true" :option="onRowClicked">
			<template #header>
				<h1 class="border-t bg-white rounded-t-md py-3 pl-4 font-semibold">
					Categories List
				</h1>
			</template>
			<template #item="{ item }">
				<span v-if="item.options">
					<p v-if="item.data.options" class="space-x-3 space-y-4"><span v-for="(itm, idx) in item?.data?.options" :key="idx" class="text-white font-medium px-3 py-2 text-[10px] bg-gray-600 rounded-xl">{{ itm.name }}</span></p>
					<p v-else>No issues available</p>
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useTripRatingIdDetails } from '@/composables/modules/configure/id'
import { useTripRatingSettings, useTripRatingSettingsCategories } from '@/composables/modules/configure/fetch'
const { loadingTripRatingSettings, getTripRatingSettings, tripRatingSettingsReference } = useTripRatingSettings()
const { loadingTripRatingSettingsCategories, getTripRatingSettingsCategories, tripRatingSettingsCategories } = useTripRatingSettingsCategories()
const onRowClicked = (data) => {
	const { selectedTripRating } = useTripRatingIdDetails()
	useRouter().push(`/configuration/trip-rating-settings/${data.reference}`)
	selectedTripRating.value = data
}

getTripRatingSettings(import.meta.env.VITE_TRIP_RATING_SERVICE_ID)
getTripRatingSettingsCategories(tripRatingSettingsReference.value)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'CATEGORY',
        value: 'name'
    },
    {
        text: 'ISSUE TYPES',
        value: 'options',
		width: '900px'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    }
])

const category = reactive({
        name: '',
        issues: []
      })

	  const issueType = ref('') as any
      const categoriesList = ref([])

const addIssueToList = () => {
      category.issues.unshift(issueType.value)
      issueType.value = ''
    }

   const deleteIssueFromList = (indexOfItem) => {
      category.issues = category.issues.filter(
        (item, index) => index !== indexOfItem
      )
    }

</script>
