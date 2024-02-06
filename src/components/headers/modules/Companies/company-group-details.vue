<template>
	<HeadersHeaderSlot :title="`${selectedCorporateGroup.name}`" pre-title="Overview" :loading="Object.keys(selectedCorporateGroup).length === 0" />
</template>

<script setup lang="ts">
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
const { loading, selectedCorporateGroup, getCorporateGroupByGroupId } = useCorporateGroupByGroupId()

if (Object.keys(selectedCorporateGroup.value).length === 0) {
    const id = useRoute().params.id as string
    getCorporateGroupByGroupId()
}

const router = useRouter()
const route = useRoute()
</script>
