<template>
	<Modal
		modal="$atts.modal"
		title="Add Work Shift"
	>
		<form class="flex flex-col gap-6" @submit.prevent="createWorkBranch">
			<div class="field relative">
				<label for="start_time">Start time</label>
				<input id="start_time" v-model="form.start_time" type="text" class="input-field">
			</div>
			<div class="field relative">
				<label for="end_time">End time</label>
				<input v-model="form.end_time" for="end_time" type="text" class="input-field">
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Add Work shhift
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">

const form = reactive({
 start_time: '',
 end_time: ''
})

const isFormEmpty = computed(() => {
    return !!(form.start_time && form.end_time)
})

const createWorkBranch = () => {

}

</script>

<style>

</style>
