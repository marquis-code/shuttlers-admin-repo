<template>
	<Modal modal="$atts.modal" title="Update Identity Information">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updateIdentity">
			<div class="flex flex-col gap-2">
				<label class="label">Means of identification</label>
				<select v-model="identification" required class="input-field">
					<option value="nin">
						NIN
					</option>
					<option value="bvn">
						BVN
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">ID number</label>
				<input v-model.trim="id_number" required type="text" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Date of birth</label>
				<InputDateInput v-model="dob" />
			</div>

			<div class="pt-6">
				<button type="submit" :disabled="loading || !enableButton" class="modal-btn">
					{{ loading ? 'processing...' : 'Update Identity' }}
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateKyc } from '@/composables/modules/partners'

const { identification, id_number, loading, dob, updateIdentity, clearObj } = useUpdateKyc()

const enableButton = computed(() => {
    return !!(dob.value && id_number.value)
})

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label {
    margin: 0;
}
</style>
