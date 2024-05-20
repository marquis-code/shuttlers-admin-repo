<template>
	<Modal
		modal="$atts.modal"
		:title="!isEditChargeType ? 'Add new charge type' : 'Edit charge type'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="isEditChargeType ? updateCharge() : createCharge()">
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Charge name</label>
				<input v-model.trim="name" required placeholder="e.g Value Added Tax" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Short name</label>
				<input v-model.trim="short_name" required placeholder="e.g VAT" class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Description</label>
				<textarea v-model.trim="desc" required placeholder="Write a short description about this charge"
					class="input-field max-h-[100px]" cols="30" rows="10"
				/>
			</div>
			<button type="submit" :disabled="loading"
				class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : `${isEditChargeType ? 'Edit charge type' :'Add charge type'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateChargeType } from '@/composables/modules/configure/charges/types/create'

const { loading, short_name, desc, name, isEditChargeType, createCharge, closeAddTypeModal, updateCharge } = useCreateChargeType()

onBeforeUnmount(() => closeAddTypeModal())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
