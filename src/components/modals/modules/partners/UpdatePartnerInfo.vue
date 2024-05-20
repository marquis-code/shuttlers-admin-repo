<template>
	<Modal
		modal="$atts.modal"
		title="Update Partner"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updatePartner">
			<div class="flex flex-col gap-2">
				<label class="label">First name</label>
				<input v-model="fname" required type="text" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Last name</label>
				<input v-model="lname" required type="text" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Email</label>
				<input v-model="email" required type="email" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Phone number</label>
				<input v-model="phone" required type="text" class="input-field">
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Update Partner' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdatePartnerInfo } from '@/composables/modules/partners'

const { loading, clearObj, fname, lname, email, phone, updatePartner } = useUpdatePartnerInfo()
const enableButton = computed(() => {
	return !!(fname.value && lname.value && email.value)
})
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
