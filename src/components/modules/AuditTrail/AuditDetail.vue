<template>
	<div class="lg:w-5/12 bg-white p-3 border rounded-md h-[400px]">
		<div class="border-b py-4">
			<div class="space-y-1 px-3">
				<h1 class="font-medium text-lg">
					About this activity
				</h1>
				<p class="text-sm">
					Full glance of all actions for this activity
				</p>
			</div>
		</div>
		<div class="flex justify-center items-center h-full">
			<div class="flex justify-center items-center flex-col gap-y-1">
				<p class="text-center font-medium">
					No Activity
				</p>
				<p class="text-center text-sm">
					No activity Kindly select an activity to view full details about it
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
	auditDetails: object
  }>(), {})
</script>
