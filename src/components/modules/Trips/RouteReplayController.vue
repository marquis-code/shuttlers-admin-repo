<template>
	<div class="route-replay w-full max-w-4xl">
		<div class="flex items-center justify-between">
			<div>
				<h4 v-if="!isEmptyObject(selectedVehicle)" class="text-[#09090F] text-[16px]">
					Journey of {{ selectedVehicle.name }}
				</h4>
				<h4 v-else class="text-[#09090F] text-[16px]">
					No vehicle selected
				</h4>
				<div class="flex gap-x-1">
					<span class="block text-[#6E717C] text-[14px]">--</span>
					<span class="block text-[#6E717C] text-[14px]">--</span>
				</div>
			</div>

			<div class="flex items-center gap-x-5 transform translate-y-px">
				<div class="flex items-center gap-x-4">
					<button @click="prev">
						<Icon name="prev" class="w-7" />
					</button>
					<button>
						<Icon v-if="!isPlaying" name="play" class="w-7" @click="play" />
						<Icon v-else name="pause" class="w-7" @click="pause" />
					</button>
					<button @click="next">
						<Icon name="next2" class="w-7" />
					</button>
				</div>

				<div v-if="count" class="flex items-center gap-x-3">
					<span>{{ count }}</span> / <span>{{ countEnd }}</span>
				</div>
			</div>

			<div class="flex items-center gap-x-3 transform translate-y-px">
				<button v-for="speed in speedArray" :key="speed.name" class="transition-all bg-[#E6FFF2] py-[6px] px-[12px] rounded-[8px] hover:bg-[#0DAC5C] hover:bg-opacity-30"
					:class="{'bg-greenx': speed.value === currentSpeed}" @click="changeSpeed(speed.value)">
					<span class="inline-block text-shuttlersGreen">{{ speed.name }}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouteReplay, useRouteReplayControls } from '@/composables/modules/commute/replay/fetch'
import { isEmptyObject } from '@/composables/utils/basics'

const { play, isPlaying, pause, count, countEnd, next, prev, changeSpeed, currentSpeed } = useRouteReplayControls()

const { selectedVehicle } = useRouteReplay()

const speedArray = ref([
  { name: '1x', value: 1000 }, { name: '5x', value: 500 }, { name: '10x', value: 250 }
])
</script>

<style scoped>
.route-replay {
  border-radius: 16px;
  border: 1px solid #eaecf0;
  background: #fff;
  padding: 23px 24px 25px 24px;

  box-shadow: 0px 10px 24px 0px rgba(33, 35, 37, 0.08);
}
</style>
