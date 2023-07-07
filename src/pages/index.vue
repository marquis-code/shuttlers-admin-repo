<template>
	<div class="text-8xl font-bold">
		Hello World!
	</div>

	<span>
		ways to use icons:

	<icon name="invoice" class="w-20 text-red-800" />
	<component :is="invoice_icon" class="w-20 text-red-800" />

	check the source code for more info at <code>src/pages/index.vue</code>
	</span>
<br> <br>
	<span>
		Modals need to be register and then called
	</span>
<br> <br>
	<span>
		<button class="bg-dark text-light px-4 py-2 rounded-sm" @click="useAlert().openAlert({ type: 'SUCCESS', msg: 'alert called!' })">click to open alert</button>
	</span>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/useNotification'
import invoice_icon from '@/assets/icons/src/invoice.vue'

definePageMeta({
	layout: 'dashboard'
})
</script>

<style scoped></style>
