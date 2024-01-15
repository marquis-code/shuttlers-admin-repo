<template>
	<div>
		<div class="container-fluid py-5">
			<div class="lg:w-6/12">
				<div class="">
					<div class="card">
						<div class="card-body">
							<h1 class="font-bold text-lg text-gray-900">
								New Referral Code
							</h1>
							<ModulesReferralCodeFormSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})
</script>
