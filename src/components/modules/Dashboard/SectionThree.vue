<template>
	<section class="card">
		<div class="border-b flex justify-between items-center pb-3">
			<div>
				<h3 class="font-medium px-6">
					Trip rating service
				</h3>
			</div>
			<div class="pr-3">
			</div>
		</div>
		<div class="p-5 space-y-6">
			<div class="rounded-md border bg-white shadow-sm space-y-4 p-6 lg:w-4/12">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-400 font-light">
							Customer Satisfaction
						</p>
						<p><span class="text-3xl font-bold">4.4</span>/5</p>
					</div>
					<div>
						<img src="@/assets/images/rating-star.jpg" alt="" class="rounded-full h-14 w-14 bg-yellow-200 p-3">
					</div>
				</div>
				<p class="flex items-center space-x-1">
					<span class="inline"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
						fill="none" stroke="#21d369" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
						<path d="M15 7h6v6" />
					</svg></span> <span class="text-green-600 inline">73 ratings</span> in total
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

// const dateSelected = ref(null)

</script>

<style scoped></style>
