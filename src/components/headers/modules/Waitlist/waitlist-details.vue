<template>
	<HeadersHeaderSlot :title="`Waitlist for ${selectedWaitlist}`" pre-title="VEHICLE PARTNER OVERVIEW" :loading="Object.keys(selectedPartner).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'

const { selectedWaitlist, getWaitlistById } = useWaitlistIdDetails()

if (Object.keys(selectedWaitlist.value).length === 0) {
    const id = useRoute().params.id as string
    getWaitlistById(id)
}
</script>

<style scoped>

</style>
