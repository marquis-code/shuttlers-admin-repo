<template>
	<Modal
		modal="$atts.modal"
		title="Assign to route itenerary"
	>
		<form class="flex flex-col gap-4 w-full">
			<div class="bg-[#F9FBFD] p-4 rounded-lg flex flex-col gap-4">
				<div class="flex items-center gap-4 justify-between">
					<p class="text-sm font-medium text-[#101211]">
						Samuel Olubi
					</p>
					<div class="flex flex-col gap-1 text-right">
						<p class="text-sm font-medium text-[#6E717C]">
							Daniel Yusuf
						</p>
						<p class="text-sm font-medium text-[#6E717C]">
							Sienna (AKD 748 HB) - 24 seats
						</p>
					</div>
				</div>
				<div class="w-full border" />
				<div class="flex items-center gap-4 justify-between">
					<p class="text-xs font-medium text-[#6E717C]">
						Cost of Supply
					</p>
					<p class="text-base font-medium text-[#101211]">
						₦20,500
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="label">Seat Utilization</label>
					<input required type="number" step="0.01" class="input-field">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Pricing margin</label>
					<input required type="number" step="0.01" class="input-field">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Pricing margin unit</label>
					<select required class="input-field">
						<option v-for="n in [{key: 'Percent', value: 'percent'}, {key: 'Flat amount', value: 'flat'}]" :key="n.value" :value="n.value">
							{{ n.key }}
						</option>
					</select>
				</div>
			</div>
			<p class="text-xs font-medium text-[#6E717C]">
				Assigning a Vehicle and Driver to this route itinerary will automatically end the auction.
			</p>
			<button type="submit" :disabled="false" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ false ? 'processing...' : 'Assign' }}
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
