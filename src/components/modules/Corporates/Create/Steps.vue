<template>
	<div>
		<h2 class="sr-only">
			Steps
		</h2>

		<div
			class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 w-10/12">
			<ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
				<li class="flex items-center gap-2 bg-white p-2">
					<span class="h-6 w-6 rounded-full text-center text-[10px]/6 font-bold bg-black text-white">
						1
					</span>

					<span
						:class="[routeQuery.tab === 'company-information' ? 'font-medium text-gray-950' : ' text-gray-500']"
						class="hidden sm:block"> Company information </span>
				</li>

				<li class="flex items-center gap-2 bg-white p-2">
					<span class="h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white bg-black">
						2
					</span>

					<span
						:class="[routeQuery.tab === 'admin-information' ? 'font-medium text-gray-950' : 'text-gray-500']"
						class="hidden sm:block">Admin information</span>
				</li>
			</ol>
		</div>
	</div>
</template>

<script lang="ts" setup>
 const props = defineProps({
    routeQuery: {
        type: Object,
        require: true,
        default: () => {}
    }
 })
</script>

<style>

</style>
