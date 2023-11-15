<template>
	<main class="flex justify-start items-start gap-x-10">
		<div v-if="!loading" class="w-6/12 shadow-md border-[0.4px] rounded-md space-y-6">
			<p class="p-3 border-b pl-6">
				Category Information
			</p>
			<div class="p-6 space-y-4">
				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						CATEGORY
					</p>
					<p>{{ selectedTripRating?.name }}</p>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						ISSUE TYPES
					</p>
					<div v-if="selectedTripRating.options">
						<p v-for="issueType in selectedTripRating?.options" :key="issueType">
							{{ issueType.name }}
						</p>
					</div>
					<p v-else>
						No issues available
					</p>
				</div>
			</div>
		</div>
		<Skeleton v-else width="500px" height="300px" />
		<div class="w-6/12 shadow-md border-[0.4px] rounded-md pb-8">
			<h1 class="py-3 border-b pl-4 font-medium">
				Update Category
			</h1>
			<div class="p-6 space-y-6">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="vehicleBrand"
							class="text-sm font-light text-gray                                                                             ">
							Category name</label>
						<input v-model.trim="category.name" type="text" name="vehicleBrand"
							class="w-full outline-none px-3 py-3 rounded-md border focus:border-gray-900">
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="vehicleName"
							class="text-sm font-light text-gray">Vehicle
							Issue type (Minimum of two issues)</label>
						<div class="flex items-center">
							<input v-model.trim="issueType" type="text" name="vehicleName"
								class="w-full outline-none px-3 py-3 rounded-l-md border focus:border-gray-900">
							<button
								class="text-white disabled:cursor-not-allowed disabled:opacity-25 py-3 bg-black px-6 rounded-r-md"
								:disabled="!issueType"
								type="button"
								@click.prevent="addIssueToList"
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="px-6 space-y-3">
				<div v-for="(itm, index) in category.issues" :key="index" class="flex items-center justify-between">
					<p>{{ itm }}</p>
					<img src="@/assets/icons/source/close.svg" alt="" class="cursor-pointer" @click="filterList(itm)">
				</div>
			</div>
			<div class="pl-6 mt-6">
				<button class="text-white text-sm bg-black py-3 rounded-md px-3 ">
					Update Category
				</button>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useTripRatingIdDetails } from '@/composables/modules/configure/id'
const { selectedTripRating, loading, getTripRatingById } = useTripRatingIdDetails()
const id = useRoute().params.id as string
getTripRatingById(id)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const category = reactive({
        name: selectedTripRating?.value?.name,
        issues: []
      })

	  const issueType = ref('')

	  const categoriesList = ref([])

const addIssueToList = () => {
      category.issues.push(issueType.value)
      issueType.value = ''
    }

   const deleteIssueFromList = (indexOfItem) => {
      category.issues = category.issues.filter(
        (item, index) => index !== indexOfItem
      )
    }

	const filterList = (itm) => {
        category.issues = category.issues.filter(
            (item, index) => item !== itm
        )
    }
</script>

<style scoped></style>
