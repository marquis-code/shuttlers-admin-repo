<template>
	<HeadersHeaderSlot :title="`${selectedPartner?.owner?.fname} ${selectedPartner?.owner?.lname}`"
		pre-title="VEHICLE PARTNER OVERVIEW"
		:loading="Object.keys(selectedPartner).length === 0"
	/>
</template>

<script setup lang="ts">
import { usePartnerIdDetails } from '@/composables/modules/partners'

const { selectedPartner, getPartnerById } = usePartnerIdDetails()
const id = useRoute().params.id as string
getPartnerById(id)

</script>

<style scoped>

</style>
