<template>
	<Modal
		modal="$atts.modal"
		title="Change Password"
		:no-close-btn="false"
		class="text-center"
	>
		<h1 class="text-center -mt-5 text-gray-400">
			Complete the form below to create a new password
		</h1>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'

</script>
