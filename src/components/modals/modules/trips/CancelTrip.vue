<template>
	<Modal
		modal="$atts.modal"
		title="Cancel trip"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="cancelTrip">
			<div class="flex flex-col gap-2">
				<label class="label">Reason</label>
				<input v-model="reason" type="text" required class="input-field">
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Enter your password</label>
				<div class="relative h-fit w-full">
					<input v-model="password" :type="show ? 'text' : 'password'" required class="input-field">
					<button type="button" class="text-xs text-dark font-medium absolute top-1/2 -translate-y-1/2 right-2"
						@click="show = !show"
					>
						{{ show ? 'hide' : 'show' }}
					</button>
				</div>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Cancel trip' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCancelTrip } from '@/composables/modules/trips/cancel'

const { loading, clearObj, reason, password, cancelTrip, enableButton } = useCancelTrip()
const show = ref(false)
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
