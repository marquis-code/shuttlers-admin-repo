<template>
	<aside v-if="cardIsOpen" class="fixed inset-0 bg-slate-50 bg-trans">
		<Skeleton v-if="loading" height="70vh" width="400px" class="absolute top-[72px] right-6 flex flex-col items-start z-40 bg-light w-[400px] h-[75%] p-5 rounded-lg " />
		<section v-else class="fixed inset-y-0 right-0 flex flex-col items-start z-40 bg-light w-[400px] h-full  ">
			<header class="flex justify-between w-full items-center border-b p-5">
				<span class="text-dark text-lg font-bold">Route requests</span>
				<Icon name="closed" class="w-5 cursor-pointer" @click="closeCard" />
			</header>

			<article class="p-3 flex flex-col w-full">
				<div class="flex justify-between items-center w-full">
					<RouteDescription pickup="Akin Adesola Street, Lagos, Nigeria" destination="21 Road, Festac Town, Lagos" />
					<div class="text-sm flex flex-col justify-between h-full py-2 font-medium">
						<span>One-way trip</span>
						<span>6:00 AM</span>
					</div>
				</div>
				<footer class="flex justify-between mt-3">
					<button class="bg-white text-shuttlersGreen border px-4 border-shuttlersGreen rounded-full">
						View
					</button>
					<div class="flex gap-3">
						<button class="btn-outline-xs border-red text-red">
							Decline
						</button>
						<button class="btn-primary-xs !py-2">
							Approve
						</button>
					</div>
				</footer>
			</article>
		</section>
	</aside>
</template>

<script setup lang="ts">
import { useOpenRouteRequest } from '@/composables/modules/agents/routeRequest'

const { closeCard, loading, cardIsOpen } = useOpenRouteRequest()

</script>

<style scoped>
.bg-trans{
    background: rgba(16, 18, 17, 0.24);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
