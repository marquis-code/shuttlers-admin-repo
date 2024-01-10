<template>
	<HeadersHeaderSlot
		:title="`Waitlist for ${useLocalDateFormatter(
			selectedWaitlistObject.date
		)}`"
		pre-title="overview"
		:loading="Object.keys(selectedWaitlistObject).length === 0"
	>
		<template #actions>
			<div class="flex items-center space-x-2">
				<ButtonIconDropdown
					button-text="Actions"
					:children="dropdownChildren"
					:data="selectedWaitlistObject"
					class="px-4 bg-black text-white border-2 rounded-lg border-gray-950"
				/>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'
import { useLocalDateFormatter } from '@/composables/core/localDateFormatter'

const { selectedWaitlistObject, getWaitlistById } = useWaitlistIdDetails()

if (Object.keys(selectedWaitlistObject.value).length === 0) {
  getWaitlistById()
}

const dropdownChildren = computed(() => [
  { name: 'Add vehicle', func: (data) => {} },
  { name: 'Change vehicle', func: (data) => {} },
  { name: 'Notify All', func: (data) => {} }
])
</script>
