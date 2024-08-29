<template>
	<HeadersHeaderSlot :loading="loading_detail" :title="`${groupDetails?.name}`" pre-title="Overview" />
</template>

<script setup lang="ts">
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
import { useCreateGroup, useCorporateGroupDetails } from '@/composables/modules/corporates/group'

const { groupDetails, loading: loading_detail } = useCorporateGroupDetails()
const router = useRouter()
const route = useRoute()
const { loading, selectedCorporateGroup, getCorporateGroupByGroupId } = useCorporateGroupByGroupId()
getCorporateGroupByGroupId()
if (Object.keys(selectedCorporateGroup.value).length === 0) {
    getCorporateGroupByGroupId()
}

const pageTitle = ref(selectedCorporateGroup.value.name)
onMounted(() => {
    const queryTitle = route.query.title
    if (queryTitle) {
        pageTitle.value = queryTitle
    } else {
        router.push({ query: { ...route.query, title: pageTitle.value } })
    }
    document.title = pageTitle.value
})

watch(pageTitle, (newTitle) => {
    router.push({ query: { ...route.query, title: newTitle } })
    pageTitle.value = newTitle
})
</script>
