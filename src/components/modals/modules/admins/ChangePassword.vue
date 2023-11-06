<template>
	<Modal
		modal="$atts.modal"
		title="Refund amount"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6" @submit.prevent="changePassword">
			<div class="field relative">
				<label for="oldPassword">New Password</label>
				<input id="oldPassword" v-model="form.oldPassword" type="password" class="input-field" required>
			</div>
			<div class="field relative">
				<label for="newPassword">Password Confirmation</label>
				<input id="newPassword" v-model="form.newPassword" type="password" class="input-field" required>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
const form = ref({
    oldPassword: '',
    newPassword: ''
})

const changePassword = () => {
    
}
</script>

<style>

</style>
