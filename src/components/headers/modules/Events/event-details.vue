<template>
	<HeadersHeaderSlot title="Event Request" pre-title="OVERVIEW">
		<!-- <template #tabs>
		</template> -->
		<template #actions>
			<ButtonIconDropdown v-if="showActionBtn" class="bg-black font-medium text-white px-3 py-1 rounded-lg" button-text="Actions" :children="dropdownChildren" :data="selectedEvent" class-name="w-40" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useEventIdDetails, useAcceptEvent, useQueryOrRejectEvent, useNotifyEvent } from '@/composables/modules/events'
import { useEventModal } from '@/composables/core/modals'

const { loading, selectedEvent } = useEventIdDetails()
const { initQueryOrReject } = useQueryOrRejectEvent()
const { initNotifyEvent } = useNotifyEvent()

const dropdownChildren = computed(() => {
	if (selectedEvent.value?.status !== 'accepted') {
		return [
			{ name: 'Accept', func: () => useAcceptEvent().initAcceptEvent() },
			{ name: 'Query', func: () => { initQueryOrReject('query') } },
			{ name: 'Reject', func: () => { initQueryOrReject('reject') } }
		]
	} else {
		return [
			{ name: 'Notify Attendees', func: () => initNotifyEvent('attendees') },
			{ name: 'Assign Route', func: () => { useEventModal().openAssignRoutes() } }
		]
	}
})

const showActionBtn = computed(() => {
	if (selectedEvent.value?.status === 'rejected') return false
	if (selectedEvent.value?.status === 'cancelled') return false
	return true
})
</script>
