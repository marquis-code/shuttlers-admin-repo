<template>
	<div class="flex items-center gap-x-2">
		<span>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.57666 1.99751C8.31974 1.55474 7.68034 1.55474 7.42342 1.99751L5.61405 5.11572C5.48713 5.33444 5.26777 5.4837 5.01772 5.52147L1.62685 6.03362C1.05733 6.11964 0.857554 6.83871 1.30109 7.20617L3.82715 9.29899C4.06098 9.49271 4.17093 9.79829 4.11413 10.0966L3.45335 13.5667C3.34889 14.1152 3.92475 14.5414 4.41885 14.2813L7.61179 12.6001C7.85481 12.4721 8.14527 12.4721 8.38829 12.6001L11.5812 14.2813C12.0753 14.5414 12.6512 14.1152 12.5467 13.5667L11.886 10.0966C11.8292 9.79829 11.9391 9.49271 12.1729 9.29899L14.699 7.20617C15.1425 6.83871 14.9428 6.11964 14.3732 6.03362L10.9824 5.52147C10.7323 5.4837 10.5129 5.33444 10.386 5.11572L8.57666 1.99751Z"
					fill="#444854"
				/>
			</svg>
		</span>
		<span class="font-bold"> {{ rating }} </span>
		<span v-if="showTrip">({{ totalTrips }} trips)</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
    rating: [Number, String],
    totalTrips: [Number, String],
    showTrip: {
      type: Boolean,
      default: true
    }
})
</script>
