<template>
	<Modal
		modal="$atts.modal"
		title=""
	>
		<div class="flex flex-col items-center gap-8">
			<img src="@/assets/icons/source/success_check.svg" alt="">
			<div class="flex flex-col gap-2">
				<h3 class="text-base font-medium text-dark text-center">
					Successful
				</h3>
				<p class="text-grey5 text-center font-medium">
					You have successfully logged an issue, go to
					<NuxtLink to="/trips/trip-issues" class="text-green7" @click="useTripsModal().closeCreateIssues()">
						Issues
					</NuxtLink>
					to see all logged issues.
				</p>
				<button type="button" class="text-sm bg-dark p-3 text-light text-center rounded" @click="useTripsModal().closeCreateIssues()">
					Dismiss
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useTripsModal } from '@/composables/core/modals'

</script>

<style scoped>
label{
	margin: 0;
}
</style>
