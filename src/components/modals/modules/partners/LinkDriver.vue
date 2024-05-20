<template>
	<Modal
		modal="$atts.modal"
		title="Link Driver"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="initlinkDriver">
			<div class="flex flex-col gap-2">
				<p class="text-base text-dark font-medium">
					Select driver to link
				</p>
				<p class="text-sm text-grey5">
					You can select multiple drivers
				</p>
			</div>

			<div class="field relative">
				<label class="label">Select Driver</label>
				<InputMultiSelectDriver :multiple="true" @updated="drivers = $event" />
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-4 text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-grey8">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useLinkDriver } from '@/composables/modules/partners'

const { loading, drivers, initlinkDriver } = useLinkDriver()
const enableButton = computed(() => {
	return !!(drivers.value.length)
})

onBeforeUnmount(() => drivers.value = [])
</script>

<style scoped>
label{
	margin: 0;
}
</style>
