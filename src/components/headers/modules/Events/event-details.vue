<template>
	<HeadersHeaderSlot title="Event Request" pre-title="OVERVIEW">
		<template #tabs>
			<div class="flex items-center gap-x-3 py-1">
				<p class="text-gray-600 text-sm">
					Events
				</p>
				<img src="@/assets/icons/source/breadcrum.svg" alt="">
				<p class="font-semibold text-gray-900 text-sm">
					Event information
				</p>
			</div>
		</template>
		<template #actions>
			<div class="flex items-center space-x-2">
				<button class="px-4 bg-black text-white py-2 border-2 rounded-lg border-gray-950">
					Actions
				</button>
			</div>
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts"></script>
