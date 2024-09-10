<template>
	<Modal modal="$atts.modal" title="Update Address Information">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updateAddress">
			<div class="flex flex-col gap-2">
				<label class="label">Address</label>
				<LocationInput id="kyc-address" v-model="address" class="input-field" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Document</label>
				<div class="grid grid-cols-2 gap-2 items-stretch relative">
					<input id="addressKycFileInput" type="file" class="hidden absolute -top-10" accept="image/*,application/pdf" @change="handleFileChange">
					<p class="bg-[#EFF2F7] rounded-lg flex items-center p-2">
						{{ truncateString(file, 20 ) }}
					</p>
					<button type="button" class="p-2 rounded-lg border text-dark" @click="triggerInputFile">
						Update document
					</button>
				</div>
			</div>

			<div class="pt-6">
				<button type="submit" :disabled="loading || !enableButton" class="modal-btn">
					{{ loading ? 'processing...' : 'Update Address' }}
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateKyc } from '@/composables/modules/partners'
import { truncateString } from '@/composables/utils/formatter'

const { identification, id_number, loading, dob, updateAddress, clearObj, address, file, document: doc } = useUpdateKyc()

const enableButton = computed(() => {
    return !!(address.value?.name)
})

const triggerInputFile = () => {
	const fileInput = document.getElementById('addressKycFileInput')
	fileInput?.click()
}

const handleFileChange = (event) => {
    doc.value = event.target.files[0]
}

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label {
    margin: 0;
}
</style>
