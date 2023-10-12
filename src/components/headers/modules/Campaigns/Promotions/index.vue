<template>
	<HeadersHeaderSlot :title="`Promotional ${computedPageTitle}`" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
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

const computedPageTitle = computed(() => {
    const componentName = route?.name?.split('-')[2]
    console.log(componentName, 'de')
   if (componentName === 'banner') {
    return 'Banner'
   }

   if (componentName === 'carousel') {
    return 'Carousel'
   }
})

</script>

<style scoped></style>
