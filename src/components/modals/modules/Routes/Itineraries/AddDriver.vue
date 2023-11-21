<template>
	<Modal
		modal="$atts.modal"
		:title="true ? 'Add Driver' : 'Update Driver'"
	>
		<form class="flex flex-col gap-4 w-full">
			<div class="flex flex-col gap-2">
				<DriverSelector />
				<label class="label">Cost of supply</label>
				<input type="number" placeholder="Enter cost of supply" class="input-field">
				<!-- <select v-model="chargeTypeId" required class="input-field disabled:cursor-not-allowed" :disabled="isEditConfigureCharge">
					<option v-for="n in allChargeTypes" :key="n.id" :value="n.id">
						{{ n.short_name }} - ({{ n.name }})
					</option>
				</select> -->
			</div>
			<button type="submit" :disabled="false" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ true ? 'processing...' : `${true ? 'Update Driver' : 'Add Driver'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">

onBeforeUnmount(() => {})
</script>

<style scoped>
label{
	margin: 0;
}
</style>
