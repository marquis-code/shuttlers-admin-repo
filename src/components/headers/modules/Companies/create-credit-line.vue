<template>
	<HeadersHeaderSlot :title="`${selectedCorporate.corporate_name}`" pre-title="Overview" :loading="Object.keys(selectedCorporate).length === 0" />
</template>
<script setup lang="ts">
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'

const { selectedCorporate, getCorporateById } = useCorporateIdDetails()

if (Object.keys(selectedCorporate.value).length === 0) {
    const id = useRoute().params.id as string
    getCorporateById(id)
}
</script>
<style scoped></style>
