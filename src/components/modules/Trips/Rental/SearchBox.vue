<template>
	<div class="search-box">
		<div class="absolute left-9 center-col h-full py-8">
			<icon name="position" class="w-7" />
			<span class="border border-dashed h-full" />
			<icon name="location" class="w-8" />
		</div>

		<div class="flex flex-col w-[87%] pl-8">
			<LocationInput id="location" v-model="credentials.from.value" class="input-field-search border-b border-grey10 h-14" placeholder="Pick up location" />
			<LocationInput id="destination" v-model="credentials.to.value" class="input-field-search h-14" placeholder="Search destination" />
		</div>
		<!-- <icon name="switch" class="h-10 absolute right-0" /> -->
	</div>
</template>

<script setup lang="ts">
import { use_post_charter } from '@/composables/modules/Rentals'

const { credentials } = use_post_charter()
</script>

<style scoped>
.search-box{
	@apply w-full flex justify-center items-center border border-grey10 rounded-lg  mt-5 ;
}
</style>
