<template>
	<HeadersHeaderSlot :title="`${selectedCorporateGroup?.name}`" pre-title="Overview" :loading="loading" />
</template>

<script setup lang="ts">
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
const { loading, selectedCorporateGroup, getCorporateGroupByGroupId } = useCorporateGroupByGroupId()
getCorporateGroupByGroupId()
if (Object.keys(selectedCorporateGroup.value).length === 0) {
    getCorporateGroupByGroupId()
}

</script>
