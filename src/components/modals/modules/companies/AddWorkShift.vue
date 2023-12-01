<template>
	<Modal
		modal="$atts.modal"
		:title="`${isEditShift ? 'Edit' : 'Add'} Work Shift`"
	>
		<form class="flex flex-col gap-6" @submit.prevent="createWorkBranch">
			<div class="field relative">
				<label for="start_time">Start time</label>
				<InputTimeInput v-model="form.start_time" />
			</div>
			<div class="field relative">
				<label for="end_time">End time</label>
				<InputTimeInput v-model="form.end_time" />
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="!isFormEmpty">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Add work shift
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateWorkShift } from '@/composables/modules/corporates/workShifts'
const { createWorkShiftForm, loading, isEditShift, createWorkShift, populateWorkShift, deleteWorkShift, updateWorkShift } = useCreateWorkShift()
const form = reactive({
 start_time: '',
 end_time: ''
})

if (isEditShift.value) {
	form.start_time = createWorkShiftForm.startTime.value
	form.end_time = createWorkShiftForm.endTime.value
}

const isFormEmpty = computed(() => {
    return !!(form.start_time && form.end_time)
})

const convert12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ')

//   const [hours, minutes] = time.split(':')

 const result = time.split(':')
 let hours = result[0]
 const minutes = result[1]
  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12).padStart(2, '0')
  }

  return `${hours}:${minutes}`
}

const createWorkBranch = () => {
	const payload = {
		startTime: convert12to24(form.start_time),
        endTime: convert12to24(form.end_time),
        description: `${form.start_time} to ${form.end_time}`
	}
	populateWorkShift(payload)
	createWorkShift()
}

</script>

<style>

</style>
