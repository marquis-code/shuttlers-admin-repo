<template>
	<div class="relative overflow-hidden min-h-screen">
		<NuxtLoadingIndicator />
		<section class="auth-body">
			<slot />
		</section>
		<div class="purpleFade" />
		<div class="greenFade" />
		<Alert />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-body {
	@apply relative w-full container mx-auto flex items-center;
	min-height: calc(100vh - 218px);

}
.purpleFade {
	@apply absolute bg-[#5a5aef] -left-60 rounded-full opacity-10;
	bottom: 5rem;
	filter: blur(86px);
	width: 463px;
	height: 463px;
}

.greenFade {
	@apply absolute -right-52 rounded-full opacity-10;
	bottom: -6rem;
	filter: blur(86px);
	width: 463px;
	height: 463px;
}
</style>
