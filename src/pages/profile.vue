<template>
	<div>
		profile
	</div>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/auth/user'

const { user } = useUser()

onMounted(() => {
	useRouter().push({ path: `/admin/${user.value.id}/info` })
})
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
