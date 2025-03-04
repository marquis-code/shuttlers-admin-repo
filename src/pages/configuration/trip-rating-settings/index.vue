<template>
	<main class="space-y-6">
		<ButtonGoBack class="mb-6" />
		<div class="bg-white rounded-md border md:w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Create New Issue Category
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="createCategory">
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
								class="w-full outline-none px-3 py-2 rounded-l-md border focus:border-gray-900"
								@keydown.enter.prevent="addIssueToList">
							<button type="button"
								class="text-white py-2 bg-black px-6 rounded-r-md disabled:cursor-not-allowed disabled:opacity-25"
								:disabled="!isFormEmpty"
								@click="addIssueToList"
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
						class="px-0 py-1 flex items-center justify-between"
					>
						<p>{{ item }}</p>
						<img src="@/assets/icons/source/red-close.svg" alt=""
							class="cursor-pointer"
							@click="deleteIssueFromList(index)"
						>
					</div>
				</div>
				<div>
					<!-- <button ty class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Create Category
					</button> -->
					<button type="submit" class="text-white disabled:cursor-not-allowed disabled:opacity-25 bg-black rounded-md px-6 py-2.5 text-xm" :disabled="!isFormEmpty">
						<span v-if="!loading" class="text-sm">Create Category</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>

		<Table :loading="loadingTripRatingSettingsCategories" :headers="tableFields" :table-data="computedTripRatingSettingsCategories" :has-options="true" :has-index="true" :option="onRowClicked">
			<template #header>
				<h1 class="border-t bg-white rounded-t-md py-3 pl-4 font-semibold">
					Categories List
				</h1>
			</template>
			<template #item="{ item }">
				<span v-if="item.options">
					<div v-if="item.data.options" class="flex flex-wrap items-center gap-2 min-w-[300px] py-2">
						<span v-for="(itm, idx) in item?.data?.options" :key="idx"
							class="text-white font-medium py-[2px] px-2 text-[10px] bg-gray-600 rounded-xl"
						>
							{{ itm.name }}
						</span>
					</div>
					<p v-else>No issues available</p>
				</span>
				<p v-if="item.created_at">
					{{ moment(item.data.created_at).format('Do MMM, YYYY') }}
				</p>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useConfigureTripRatings } from '@/composables/modules/configure/trip-ratings/create'
import { useTripRatingIdDetails } from '@/composables/modules/configure/id'
import { useTripRatingSettings, useTripRatingSettingsCategories } from '@/composables/modules/configure/fetch'
const { loadingTripRatingSettings, getTripRatingSettings, tripRatingSettingsReference } = useTripRatingSettings()
const { loadingTripRatingSettingsCategories, getTripRatingSettingsCategories, tripRatingSettingsCategories } = useTripRatingSettingsCategories()
const { populateCategoryObject, loading, configureTripRating, populateCategoryConfigFormInput, resType } = useConfigureTripRatings()
const onRowClicked = (data) => {
	const { selectedTripRating } = useTripRatingIdDetails()
	useRouter().push(`/configuration/trip-rating-settings/${data.reference}`)
	selectedTripRating.value = data
}
const isAddButtonDisabled = computed(() => {
	return !!(category.issues.length && category.name)
})
getTripRatingSettings(import.meta.env.VITE_TRIP_RATING_SERVICE_ID)
// getTripRatingSettingsCategories(tripRatingSettingsReference.value)

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
        value: 'options'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    }
])

const category = reactive({
        name: '',
        issues: [] as any[]
      })

	  const issueType = ref('') as any
      const categoriesList = ref([])
const isFormEmpty = computed(() => {
	return !!(category.name && category.issues)
})
const addIssueToList = () => {
	category.issues.unshift(issueType.value)
    //   category.issues.unshift(issueType.value)
      issueType.value = ''
    }

   const deleteIssueFromList = (indexOfItem) => {
	category.issues = category.issues.filter(
        (item, index) => index !== indexOfItem
      )
    }
const createCategory = async () => {
	const configureCategoryObj = {
	settings_id: tripRatingSettingsReference.value,
	name: category.name
}
    populateCategoryConfigFormInput(category)
	populateCategoryObject(configureCategoryObj)
	const res = await configureTripRating()
	if (res === undefined) {
		category.name = ''
        category.issues = []
		getTripRatingSettings(import.meta.env.VITE_TRIP_RATING_SERVICE_ID)
        getTripRatingSettingsCategories(tripRatingSettingsReference.value)
	}
}

const computedTripRatingSettingsCategories = computed(() => {
	if (!tripRatingSettingsCategories.value.length) return []
	const sortedArray = tripRatingSettingsCategories.value.sort((a, b) => {
		const dateA = new Date(a.created_at) as any
        const dateB = new Date(b.created_at) as any
		return dateB - dateA
	})

	return sortedArray.map((item, index) => {
      return {
		...item,
		created_at: item.created_at ?? 'N/A'
	  }
	})
})
</script>
