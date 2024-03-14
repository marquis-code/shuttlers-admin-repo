<template>
	<HeadersHeaderSlot :title="`${pageTitle}`" pre-title="Overview" :loading="loading" />
</template>

<script setup lang="ts">
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
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
