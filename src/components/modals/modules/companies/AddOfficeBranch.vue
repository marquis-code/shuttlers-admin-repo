<template>
	<Modal
		modal="$atts.modal"
		title="Add Office Branch"
	>
		<form class="flex flex-col gap-6" @submit.prevent="createWorkBranch">
			<div class="field relative">
				<label for="branch-name">Name</label>
				<input id="branch-name" v-model="form.name" type="text" class="input-field">
			</div>
			<div class="field relative">
				<label for="branch-address">Office address</label>
				<input v-model="form.address" for="branch-address" type="text" class="input-field">
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Add Work branch
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">

const form = reactive({
 name: '',
address: ''
})

const isFormEmpty = computed(() => {
    return !!(form.address && form.name)
})

const createWorkBranch = () => {

}

</script>

<style>

</style>
