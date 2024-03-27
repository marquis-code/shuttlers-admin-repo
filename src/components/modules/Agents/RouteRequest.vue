<template>
	<aside v-if="cardIsOpen" class="fixed inset-0 bg-slate-50 bg-trans" @click.self="closeCard">
		<Skeleton v-if="loading" height="70vh" width="400px" class="absolute top-[72px] right-6 flex flex-col items-start z-40 bg-light w-[400px] h-[75%] p-5 rounded-lg " />
		<section v-else class="fixed inset-y-0 right-0 flex flex-col items-start z-40 bg-light w-[400px] h-full  ">
			<header class="flex justify-between w-full items-center border-b p-5">
				<span class="text-dark text-lg font-bold">Route requests</span>
				<Icon name="closed" class="w-5 cursor-pointer" @click="closeCard" />
			</header>

			<section v-if="suggestedRoutes.length" class="flex flex-col gap-4 w-full">
				<article v-for="route in suggestedRoutes" :key="route.id" class="p-3 flex flex-col w-full">
					<div class="flex justify-between items-center w-full">
						<RouteDescription :pickup="route.pickup" :destination="route.destination" />
						<div class="text-sm flex flex-col justify-between h-full py-2 font-medium">
							<span>{{ route.is_return_trip ? 'Round-trip' : 'One-way trip' }}</span>
							<span>{{ route.departure_time }} {{ route.time_of_day }}</span>
						</div>
					</div>
					<footer class="flex justify-between mt-3">
						<nuxt-link :to="`agents/${route.owner?.id}/agent-routes`" class="bg-white text-shuttlersGreen border px-4 py-0 leading-[2] border-shuttlersGreen rounded-full">
							View
						</nuxt-link>
						<div class="flex gap-3">
							<button class="btn-outline-xs border-red text-red" @click="setDeclineRoute(route)">
								Decline
							</button>
							<button class="btn-primary-xs !py-2" @click="setAcceptRoute(route)">
								Approve
							</button>
						</div>
					</footer>
				</article>
			</section>

			<span v-else class="h-24 center w-full font-bold">No Suggested Route Request Available</span>
		</section>
	</aside>
</template>

<script setup lang="ts">
import { useOpenRouteRequest } from '@/composables/modules/agents/routeRequest'
import { useGetAgentsRoutes } from '@/composables/modules/agents/allRoute'
import { useDeclineRouteSuggestion } from '@/composables/modules/agents/decline'
import { useAcceptRouteSuggestion } from '@/composables/modules/agents/accept'

const { suggestedRoutes, getAgentsRoute } = useGetAgentsRoutes()

const { closeCard, loading, cardIsOpen } = useOpenRouteRequest()

const { setAcceptRoute } = useAcceptRouteSuggestion()
const { setDeclineRoute } = useDeclineRouteSuggestion()

getAgentsRoute()
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
