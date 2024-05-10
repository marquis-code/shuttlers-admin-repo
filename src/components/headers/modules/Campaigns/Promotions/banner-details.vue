<template>
	<HeadersHeaderSlot :loading="loading" :title="banner_details?.title" pre-title="overview">
		<!-- <template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 bg-black text-white py-2 border-2 rounded-lg border-gray-950">
					Create new banner
				</button>
			</div>
		</template> -->
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useBannerDetails } from '@/composables/modules/campaigns/banner'

const { loading, banner_details } = useBannerDetails()
</script>
