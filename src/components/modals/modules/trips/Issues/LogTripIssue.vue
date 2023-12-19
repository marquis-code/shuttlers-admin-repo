<template>
	<Modal
		modal="$atts.modal"
		:title="!isEdit ? 'Log Issue' : 'Update Issue'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="isEdit ? updateIssue() : logIssue()">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="label">Route code</label>
					<input v-model.trim="route_code" required disabled type="text" class="input-field">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Trip start time</label>
					<input v-model.trim="trip_start_time" required disabled type="text" class="input-field">
					<!-- <InputTimeInput v-model="trip_start_time" /> -->
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Incident</label>
				<Skeleton v-if="fetching_types" height="45px" radius="10px" />
				<select v-else v-model="incident" required class="input-field">
					<option value="test issue type">
						Sample issue
					</option>
					<option v-for="n in issues_types" :key="n.id" :value="n.name">
						{{ n.name }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Description</label>
				<textarea v-model.trim="desc" required placeholder="Write a short description about this issue"
					class="input-field max-h-[100px]" cols="30" rows="10"
				/>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-2 w-full">
					<label class="label">Check-up date</label>
					<InputDateInput id="check-up-date" v-model="check_up_date" class="font-light !min-w-[100px]" placeholder="Filter by date" :disabled-date="() => null" />
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Check-up time</label>
					<InputTimeInput id="check-up-time" v-model="check_up_time" />
					{{ check_up_time }}
				</div>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isEdit ? 'Update issue' : 'Log issue'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useFetchIssueTypes } from '@/composables/modules/trips/issues/types/fetch'

const { route_code, isEdit, clearObj, trip_start_time, check_up_date, incident, desc, check_up_time, loading, logIssue, updateIssue } = useCreateIssues()
const { loading: fetching_types, issues_types, fetchIssuesTypes } = useFetchIssueTypes()
const enableButton = computed(() => {
	return !!(check_up_date.value && check_up_time.value && trip_start_time.value)
})

fetchIssuesTypes()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
