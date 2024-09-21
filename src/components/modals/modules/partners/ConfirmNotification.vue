<template>
	<Modal
		modal="$atts.modal"
		title=""
		modal-class="!w-[740px]"
		:no-close-btn="true"
	>
		<!-- modal-class="!w-[740px] !h-[90vh] !max-h-[640px]" -->
		<section class="flex flex-col gap-4 justify-between h-full w-full">
			<section class="flex h-full gap-4 w-full overflow-auto">
				<div class="bg-grey p-4 h-[400px] border w-1/2 flex flex-col gap-6 rounded-2xl overflow-auto">
					<h2 class="font-bold text-sm flex gap-3 items-center">
						<Icon name="logo" class="w-6" />
						<span v-html=" credentials.title.value" />
					</h2>
					<p class="font-medium text-sm text-[#475467]" v-html="credentials.description.value" />
				</div>

				<div class="p-4 h-full w-1/2 flex flex-col gap-4 text-[#475467]">
					<!-- <Icon class="w-12" name="mobile" /> -->
					<h2 class="font-bold text-sm text-dark">
						Preview notification
					</h2>
					<p class="font-medium text-sm">
						Please confirm if this is the message you want to send to the partner(s).
					</p>

					<div class="flex w-full justify-between text-sm pb-5 border-b mt-5">
						<span class="font-medium">Partners</span>
						<span class="font-bold text-dark">{{ credentials.notifyAll.value ? 'All users' : selectedPartners.length }} Selected</span>
					</div>
					<div class="flex flex-col gap-2 w-full text-sm">
						<span class="font-medium">Notification type:</span>
						<div class="flex flex-col gap-3 text-dark">
							<p class="font-bold capitalize">
								Push Notification
							</p>
							<!-- <p class="font-bold capitalize">
								In-app Notification
							</p> -->
							<p v-if="credentials.sms.value " class="font-bold capitalize">
								SMS
							</p>
							<p v-if="credentials.email.value " class="font-bold capitalize">
								Email
							</p>
						</div>
					</div>
				</div>
			</section>
			<footer class="flex shrink-0 justify-end mt-auto gap-4 border-t pt-4">
				<button class="btn-primary bg-transparent text-dark border border-dark min-w-[100px]" :disabled="creatingNotification" @click="usePartnerModal().closeConfirmPartnerNotification()">
					Go Back
				</button>
				<button class="btn-primary !min-w-[100px]" :disabled="creatingNotification" @click="sendNotification">
					<span v-if="!creatingNotification" class="flex justify-center items-center gap-2.5">
						Send notification
					</span>
					<Spinner v-else />
				</button>
			</footer>
		</section>
	</Modal>
</template>

<script setup lang="ts">
import { usePartnerModal } from '@/composables/core/modals'
import { useCreateNotification } from '@/composables/modules/partners/notification'

const { creatingNotification, credentials, selectedPartners, sendNotification } = useCreateNotification()

</script>

<style>

</style>
