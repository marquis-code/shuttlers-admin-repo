<template>
	<HeadersHeaderSlot :title="$route.fullPath.includes('/banner/create') ? 'Create New Banner' : $route.fullPath.includes('/carousel/create') ? 'Create New Carousel' : `Promotional ${computedPageTitle}`" pre-title="Overview">
		<template v-if="!$route.fullPath.includes('create')" #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template v-if="!$route.fullPath.includes('create')" #actions>
			<NuxtLink class="btn-primary" :to="`/campaigns/promotions/${isBanner ? 'banner' : 'carousel'}/create`">
				Create New {{ isBanner ? 'Banner' : 'Carousel' }}
			</NuxtLink>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Banner',
        path: '/campaigns/promotions/banner'
    },
    {
        name: 'Carousel',
        path: '/campaigns/promotions/carousel'
    }

]

const route = useRoute()

const isBanner = computed(() => {
    return useRoute().fullPath.includes('banner')
})

const computedPageTitle = computed(() => {
    const componentName = (route?.name as string).split('-')[2]
   if (componentName === 'banner') {
    return 'Banner'
   }

   if (componentName === 'carousel') {
    return 'Carousel'
   }
})

</script>

<style scoped></style>
