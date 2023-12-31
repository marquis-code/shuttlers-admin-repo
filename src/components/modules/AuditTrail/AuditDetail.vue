<template>
	<div class="lg:w-5/12 bg-white border rounded-md h-fit pb-10 p-4 flex flex-col gap-6">
		<div class="flex flex-col gap-0 border-b pb-4">
			<h2 class="font-bold text-dark text-lg m-0">
				About this activity
			</h2>
			<p class="m-0 text-sm">
				Full glance of all actions for this activity
			</p>
		</div>

		<div v-if="!details" class="p-4 flex items-center justify-content-center">
			<div class="flex flex-col gap-0">
				<img class="w-[60%] mx-auto" src="@/assets/icons/source/empty-activity.svg" alt="">
				<h3 class="text-md text-center">
					No Activity
				</h3>
				<p class="text-sm text-center">
					No activity Kindly select an activity to view full details about it
				</p>
			</div>
		</div>
		<div v-else class="flex flex-col gap-8">
			<div class="grid grid-cols-2 gap-x-4 gap-y-8 justify-between">
				<div class="flex flex-col">
					<p class="text-[12px] text-[#444854]">
						Actor
					</p>
					<p class="text-sm font-bold text-dark">
						{{ details.fname }} {{ details.lname }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-[12px] text-[#444854]">
						Email Address
					</p>
					<p class="text-sm font-bold text-dark">
						{{ details.userEmail }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-[12px] text-[#444854]">
						IP Address
					</p>
					<p class="text-sm font-bold text-dark">
						{{ details.ipAddress ?? 'N/A' }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-[12px] text-[#444854]">
						Date & Time
					</p>
					<p class="text-sm font-bold text-dark">
						{{ moment(details.createdAt).format("Do MMMM, YYYY h:mm A") }}
					</p>
				</div>
			</div>
			<div class="flex flex-col">
				<p class="text-[12px] text-[#444854]">
					Action
				</p>
				<p class="text-sm font-bold text-dark">
					{{ details.description ?? 'N/A' }}
				</p>
			</div>
			<div class="flex flex-col">
				<p class="text-[12px] text-[#444854]">
					Type
				</p>
				<p class="text-sm font-bold text-[#4848ED]">
					{{ details.levelOfImportance ?? 'N/A' }}
				</p>
			</div>
			<div v-if="details.auditType === 'UPDATE'" class="flex flex-col">
				<p class="text-[12px] text-[#444854]">
					Updated data
				</p>
				<div class="w-full overflow-auto">
					<table class="min-w-[400px]">
						<thead>
							<tr class="border-b">
								<th class="p-2">
									Property
								</th>
								<th class="p-2 whitespace-nowrap">
									Old value
								</th>
								<th class="p-2 whitespace-nowrap">
									New value
								</th>
							</tr>
						</thead>
						<tr v-for="n in all_new_data_keys" :key="n" class="border-b">
							<td class="p-2">
								{{ n }}
							</td>
							<td class="p-2">
								{{ oldData![n] }}
							</td>
							<td class="p-2">
								{{ newData![n] }}
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useViewAuditDetails } from '@/composables/modules/audits'
const { details, all_new_data_keys, newData, oldData } = useViewAuditDetails()

</script>
