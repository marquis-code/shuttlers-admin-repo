<template>
	<HeadersHeaderSlot title="Promo Codes" pre-title="Overview">
		<template #actions>
			<div class="flex gap-3 items-center">
				<button v-if="!$route.fullPath.includes('new')" class="text-sm text-grey7 btn border-2 p-3 rounded-lg" @click="usePromotionModal().openNewReward()">
					New reward
				</button>
				<NuxtLink to="/promotion/new" class="btn-primary p-3">
					Create Promo Code
				</NuxtLink>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">
import { usePromotionModal } from '@/composables/core/modals'

</script>
<style scoped>
</style>
