<template>
	<div class="lg:w-5/12 bg-white border rounded-md h-[400px]">
		<div v-if="Object.keys(props.auditDetails).length" class="py-4">
			<div class="border-b border-gray-300">
				<div class="px-4 pb-3">
					<p class="font-medium text-lg">
						About this activity
					</p>
					<p class="text-sm">
						Full glance of all actions for this activity
					</p>
				</div>
			</div>
			<div class="p-6 space-y-6">
				<div class="flex justify-between">
					<div>
						<p class="text-xs text-gray-500">
							Actor
						</p>
						<p class="font-medium text-sm">
							{{ props?.auditDetails?.fname }} {{ props?.auditDetails?.lname }}
						</p>
					</div>
					<div>
						<p class="text-xs text-gray-500">
							Email Address
						</p>
						<p class="font-medium text-sm">
							{{ props?.auditDetails?.userEmail || 'N/A' }}
						</p>
					</div>
				</div>
				<div class="flex justify-between">
					<div>
						<p class="text-xs text-gray-500">
							IP Address
						</p>
						<p class="font-medium text-sm">
							172.22.1.139
						</p>
					</div>
					<div>
						<p class="text-xs text-gray-500">
							Date & Time
						</p>
						<p class="font-medium text-sm">
							{{ props?.auditDetails?.eventDate || 'N/A' }}
						</p>
					</div>
				</div>
				<div>
					<p class="text-xs text-gray-500">
						Action
					</p>
					<p class="font-medium text-sm">
						{{ props?.auditDetails?.description || 'N/A' }}
					</p>
				</div>
				<div>
					<p class="text-xs text-gray-500">
						Type
					</p>
					<p class="font-medium" :class="[props?.auditDetails?.levelOfImportance === 'normal' ? 'text-indigo-500' : '']">
						{{ props?.auditDetails?.levelOfImportance || 'N/A' }}
					</p>
				</div>
			</div>
		</div>
		<div v-else class="flex justify-center items-center h-full">
			<div class="flex justify-center items-center flex-col gap-y-1">
				<img class="mx-auto" src="@/assets/icons/source/empty-activity.svg" alt="">
				<p class="text-center font-medium">
					No Activity
				</p>
				<p class="text-center text-sm w-10/12">
					No activity Kindly select an activity to view full details about it
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	auditDetails: {
        type: Object,
        required: true,
		default: () => {}
    }
})
</script>
