<template>
	<div>
		<div class="flex items-center gap-x-3">
			<p class="h-0.5 w-0.5 p-0.5 bg-white rounded-full border-4 border-green-500" />
			<h6 class="font-medium block">
				{{ pickup }}
			</h6>
		</div>
		<div class="flex items-center gap-x-3">
			<img src="@/assets/icons/location.svg" class="h-4 w-4" alt=""><p class="font-medium">
				{{ destination }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
 defineProps({
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
 })
</script>
