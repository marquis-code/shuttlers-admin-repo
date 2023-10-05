<template>
	<aside v-if="cardIsOpen">
		<Skeleton v-if="loading" height="70vh" width="400px" class="absolute top-[72px] right-6 flex flex-col items-start z-40 bg-light w-[400px] h-[75%] p-5 rounded-lg" />
		<section v-else class="absolute top-[72px] right-6 flex flex-col items-start z-40 bg-light w-[400px] h-[75%] p-5 rounded-lg">
			<header class="flex justify-between w-full items-center">
				<span class="text-grey5">PASSENGER’S DETAILS</span>
				<Icon name="closed" class="w-5 cursor-pointer" @click="closeCard" />
			</header>
			<div class="flex flex-col gap-5 bg-grey mt-3 px-4 py-5  border rounded-lg w-full">
				<div class="flex items-center gap-3">
					<Avatar :size="24" :name="userDetails.fname" />
					<nuxt-link :to="`/users/${userDetails.id}/user-info`" class="underline text-purp7 text-base font-medium">
						{{ `${userDetails.fname} ${userDetails.lname}` ?? 'N/A' }}
					</nuxt-link>
				</div>
				<div class="flex items-center justify-between gap-3">
					<div class="flex items-center gap-2">
						<Icon name="mail" class="w-4 text-neut5" />
						<span class="text-sm font-medium">{{ userDetails.email }}</span>
					</div>
					<div class="flex items-center gap-2">
						<Icon name="phone" class="w-4 text-neut5" />
						<span class="text-sm font-medium">{{ userDetails.phone }}</span>
					</div>
				</div>
			</div>

			<hr class="w-full my-6">

			<RouteDescription :pickup="selectedTrip?.route?.pickup" :destination="selectedTrip?.route?.destination" />
		</section>
	</aside>
</template>

<script setup lang="ts">

import { useShowTripPassengersCard } from '@/composables/modules/trips/passengers'
const { closeCard, loading, cardIsOpen, userDetails } = useShowTripPassengersCard()

const props = defineProps({
    selectedTrip: {
        type: Object,
        default: () => {},
        required: true
    }
})
</script>

<style scoped>
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
