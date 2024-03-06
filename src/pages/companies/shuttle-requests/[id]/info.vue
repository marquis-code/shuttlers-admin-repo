<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="flex gap-x-20 items-start ">
			<section v-if="!loading" class="w-6/12 card">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Shuttle Information
					</div>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						COMPANY
					</p>
					<p class="text-sm">
						{{ shuttleRequestsDetails?.corporate?.corporate_name ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						SERVICE OPTION
					</p>
					<p>
						{{ shuttleRequestsDetails?.sharing_type ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PAYMENT OPTION
					</p>
					<p class="text-sm">
						{{ shuttleRequestsDetails?.payment_type }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						STAFF SIZE
					</p>
					<p class="text-sm">
						{{ shuttleRequestsDetails?.users?.length ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						STAFF FILTER OPTION
					</p>
					<p class="text-sm">
						N/A
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DURATION
					</p>
					<p class="text-sm">
						{{ shuttleRequestsDetails?.duration ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						START DATE
					</p>
					<p class="text-sm">
						{{
							shuttleRequestsDetails.gender ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DATE CREATED
					</p>
					<p class="text-sm">
						{{
							shuttleRequestsDetails.created_at ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						STATUS
					</p>
					<p :class="[shuttleRequestsDetails.status === 'active' ? 'text-whitw bg-shuttlersGreen rounded-md text-sm' : 'bg--orange-700 text-white   rounded-md text-sm']" class="text-sm text-white px-3 py-2">
						{{
							shuttleRequestsDetails.status === 'active' ? 'Active' : 'Inactive'
						}}
					</p>
				</div>
			</section>
			<section v-if="!loading" class="w-6/12 card">
				<div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
					<div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-shuttlersGreen">
							<h3 class="text-xl font-medium tracki">
								Shuttle request
							</h3>
						</div>
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
							<div class="flex justify-between items-center">
								<div class="flex items-center gap-x-3">
									<h3 class="text-xl font-medium tracki">
										Route planning
									</h3>
									<span class="text-white bg-yellow-500 text-xs rounded-md px-3 py-1">pending</span>
								</div>
								<div>
									<button class="text-white bg-black px-3 py-2.5 rounded-lg text-sm">
										Create route
									</button>
								</div>
							</div>
						</div>
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
							<h3 class="text-xl font-medium tracki">
								Assign staff
							</h3>
						</div>
					</div>
				</div>
			</section>
			<Skeleton v-else height="300px" />
		</section>
	</main>
</template>

<script setup lang="ts">
import { useGetCorporateShuttleRequestsDetails } from '@/composables/modules/corporates/shuttleRequestDetails'
const { getCorporateShuttleRequestDetails, loading, shuttleRequestsDetails } = useGetCorporateShuttleRequestsDetails()

onMounted(() => {
    getCorporateShuttleRequestDetails()
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>
