<template>
	<section>
		<div class="flex gap-5 mb-4">
			<img src="/user.svg" name="user" class="w-32 border rounded-full max-h-[126px] max-w-[126px] min-h-[126px] min-w-[126px]">
			<label
				for="dropzone-file"
				class="flex center  border py-4 px-6 rounded-lg cursor-pointer   max-w-[366px]"
			>
				<div class="flex flex-col items-center">
					<Icon name="upload" class="w-12" />
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold text-green7">Click to upload</span>
						or drag and drop
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (Dimension. 2021x724px)
					</p>
				</div>
			</label>
		</div>
	</section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
