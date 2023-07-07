<template>
	<div class="relative overflow-hidden min-h-screen">
		<NuxtLoadingIndicator />
		<section class="dashboard-body">
<slot />
</section>

		<Alert />
		<ModalBase />
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
