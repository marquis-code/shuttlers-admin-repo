<template>
	<main class="space-y-10">
		<div class="text-center bg-black h-14 text-white flex justify-center items-center">
			Current pilots point rate: 1 point ~ ₦50
		</div>
		<div>
			<div class="container mx-auto space-y-3">
				<div class="lg:flex justify-between items-center px-4 py-2 border rounded-lg space-y-4 lg:space-y-0">
					<div class="flex border border-gray-300 rounded-lg h-10">
						<button :class="[activeTab === 'leaderboard' ? 'bg-gray-200 text-[#364152]' : 'bg-white text-[#101828]']" class="font-[500] w-full lg:w-max rounded-l-lg leading-[28px] text-center flex justify-center items-center text-xs px-3 py-2" @click="activeTab = 'leaderboard'">
							Pilots Leaderboard
						</button>
						<p class="h-2 border-gray-500" />
						<button :class="[activeTab === 'list' ? 'bg-gray-200 text-[#364152]' : 'bg-white text-[#101828]']" class="font-[500] w-full lg:w-max leading-[28px] text-xs text-center flex justify-center items-center  rounded-r-lg px-3 py-2" @click="activeTab = 'list'">
							Reward list
						</button>
					</div>
					<div class="flex items-center gap-x-3">
						<button class="bg-black text-white w-full lg:w-max text-xs py-[10px] px-[16px] rounded-md">
							Create reward
						</button>
					</div>
				</div>
				<div v-if="activeTab === 'list'" class="overflow-x-auto border-[0.4px] rounded-lg">
					<table class="min-w-full text-xs">
						<colgroup>
							<col>
							<col>
							<col>
							<col class="w-32">
						</colgroup>
						<thead class="bg-white">
							<tr class="text-left text-gray-900">
								<th v-for="(item, index) in ['S/N', 'Reward', 'POINT', 'ACTION']" :key="index" class="px-3 py-4">
									{{ item }}
								</th>
							</tr>
						</thead>
						<tbody class="">
							<tr v-for="(item, index) in pointsList" :key="index" class="border-[0.4px] border-opacity-20 odd:bg-white even:bg-slate-50 text-gray-950">
								<td class="px-3 py-4">
									<p class="font-medium">
										{{ index + 1 }}
									</p>
								</td>
								<td class="px-3 py-4">
									<p class="font-medium">
										{{ item.reward }}
									</p>
								</td>
								<td class="px-3 py-4">
									<p class="text-gray-500">
										{{ item.point }}
									</p>
								</td>
								<td class="px-3 py-4 text-right">
									<div class="flex items-center gap-x-3">
										<div>
											<label for="AcceptConditions" class="relative h-8 w-14 cursor-pointer">
												<input id="AcceptConditions" :checked="item.status === 'active' ? true : false" type="checkbox" class="peer sr-only">

												<span
													class="absolute inset-0 rounded-full green bg-gray-300 transition peer-checked:bg-green09"
												/>

												<span
													class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
												/>
											</label>
										</div>
										<div>
											<img src="@/assets/icons/source/delete.svg" alt="delete icon">
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div v-if="activeTab === 'leaderboard'" class="space-y-6">
					<div class="lg:flex w-full gap-x-10 space-y-6 lg:space-y-0">
						<div class="rounded-lg space-y-6 bg-white p-6 border-[0.4px] lg:w-4/12">
							<p class="text-[#6E717C] font-light text-xs">
								HIGHEST PILOT POINT
							</p>
							<h1 class="text-[#000005] font-[700] text-lg leading-[20px]">
								200 points
							</h1>
							<div class="flex justify-between items-center">
								<p class="text-[#667085] font-[400] text-xs">
									Pilot
								</p>
								<p class="underline text-[#4848ED] font-[700] text-xs">
									Ifeanyi Tunde
								</p>
							</div>
						</div>
						<div class="rounded-lg space-y-6 bg-white p-6 border-[0.4px] lg:w-4/12">
							<p class="text-[#6E717C] font-light text-sm">
								LOWEST PILOT POINT
							</p>
							<h1 class="text-[#000005] font-[700] text-lg leading-[20px]">
								9 points
							</h1>
							<div class="flex justify-between items-center">
								<p class="text-[#667085] font-[400] text-xs">
									Pilot
								</p>
								<p class="underline text-[#4848ED] font-[700] text-xs">
									Itunu Kunle
								</p>
							</div>
						</div>
					</div>

					<div class="overflow-x-auto rounded-lg border-[0.4px]">
						<table class="min-w-full text-xs">
							<colgroup>
								<col>
								<col>
								<col>
								<col class="w-32">
							</colgroup>
							<thead class="bg-white">
								<tr class="text-left text-gray-900">
									<th v-for="(item, index) in ['S/N', 'PILOT', 'TOTAL POINT', 'CURRENT POINT']" :key="index" class="px-3 py-4">
										{{ item }}
									</th>
								</tr>
							</thead>
							<tbody class="">
								<tr v-for="(item, index) in leaderboardList" :key="index" class="border-[0.4px] border-opacity-20 odd:bg-white even:bg-slate-50 text-gray-950">
									<td class="px-3 py-6">
										<p class="font-medium">
											{{ index + 1 }}
										</p>
									</td>
									<td class="px-3 py-6">
										<NuxtLink to="/" class="font-medium underline text-[#4848ED]">
											{{ item.customer }}
										</NuxtLink>
									</td>
									<td class="px-3 py-6">
										<p class="text-gray-500">
											{{ item.totalPoint }}
										</p>
									</td>
									<td class="px-3 py-6">
										<p class="text-gray-500">
											{{ item.currentPoint }}
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const edit = (val) => {
//   console.log(val)
}

const activeTab = ref('list')

const pointsList = ref([
	{
		reward: 'Airtime purchase',
		point: '10 points',
		status: 'active'
	},
	{
		reward: 'Data',
		point: '10 points',
		status: 'inactive'
	},
	{
		reward: 'Shuttlers merch',
		point: '10 points',
		status: 'active'
	},
	{
		reward: 'Suregift cards',
		point: '10 points',
		status: 'active'
	}
])

const leaderboardList = ref([
	{
		customer: 'Denrele Afolabi',
		totalPoint: '170',
		currentPoint: '50'
	},
	{
		customer: 'Denrele Afolabi',
		totalPoint: '170',
		currentPoint: '50'
	},
	{
		customer: 'Denrele Afolabi',
		totalPoint: '170',
		currentPoint: '50'
	},
	{
		customer: 'Denrele Afolabi',
		totalPoint: '170',
		currentPoint: '50'
	},
	{
		customer: 'Denrele Afolabi',
		totalPoint: '170',
		currentPoint: '50'
	}
])
</script>

<style scoped></style>
