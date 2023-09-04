<template>
	<div class="flex-col h-screen gap-4 p-5 center">
		<img src="@/assets/images/core/logo.svg" alt="logo" class="w-96">
		<Spinner class="!border-t-dark" />
	</div>
</template>

<script setup lang="ts">
import { useSignInUserExternally } from '@/composables/auth/external'
const { query } = useRoute()

const { sign_user_in } = useSignInUserExternally()

onMounted(() => {
	sign_user_in(window.atob(query.token as string).replace(/"/g, '').trim(), query.path as string)
})

</script>

<style scoped>

</style>
