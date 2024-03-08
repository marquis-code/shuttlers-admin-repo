<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="flex justify-start items-start gap-x-10">
			<div v-if="!loading" class="w-5/12 shadow-md border-[0.4px] rounded-md p-6 space-y-6">
				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						Name
					</p>
					<p>{{ selectedPromotion?.name }}</p>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						Description
					</p>
					<p>{{ selectedPromotion?.description }}</p>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						Promo Code
					</p>
					<p>{{ selectedPromotion?.promo_code }}</p>
				</div>

				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						Expires At
					</p>
					<p>
						{{
							selectedPromotion.expires_at
								? useDateFormat(selectedPromotion?.expires_at, "MMMM d, YYYY").value
								: 'Never'
						}}
					</p>
				</div>

				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						MAXIMUM NUMBER OF USES
					</p>
					<p>
						{{
							selectedPromotion?.max_number_of_uses
						}}
					</p>
				</div>

				<div class="flex justify-between items-center">
					<p class="text-gray-500">
						NUMBER OF USAGES
					</p>
					<p>
						{{
							selectedPromotion?.number_of_usages
						}}
					</p>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-gray-400">
						Customer Benefits
					</p>
					<p v-if="selectedPromotion?.should_customer_benefit === 0">
						NO
					</p>
					<div v-if="selectedPromotion?.should_customer_benefit === 1" class="space-y-3">
						<div class="form-group">
							<label for="">Benefit</label>
							<h2>
								{{ selectedPromotion.customer_benefit.reward_kind }}
							</h2>
						</div>
						<div class="form-group">
							<label for="">Amount</label>
							<h2>{{ selectedPromotion.customer_benefit.reward_amount }}</h2>
						</div>

						<div class="form-group">
							<label for="">Customer Constrain</label>
							<h3>
								{{
									selectedPromotion.customer_benefit.customer_constraint == null
										? 'none'
										: selectedPromotion.customer_benefit.customer_constraint
								}}
							</h3>
						</div>
					</div>
				</div>

				<div class="flex justify-between items-center">
					<p class="text-gray-400">
						Owner Benefits
					</p>
					<p v-if="selectedPromotion?.should_owner_benefit === 0">
						NO
					</p>
					<div v-if="selectedPromotion?.should_owner_benefit === 1" class="space-y-3">
						<div class="form-group">
							<label for="">Benefit</label>
							<h2>
								{{ selectedPromotion.owner_benefit.reward_kind }}
							</h2>
						</div>
						<div class="form-group">
							<label for="">Amount</label>
							<h2>{{ selectedPromotion.owner_benefit.reward_amount }}</h2>
						</div>

						<div class="form-group">
							<label for="">Customer Constrain</label>
							<h3>
								{{
									selectedPromotion.owner_benefit.owner_constraint == null
										? 'none'
										: selectedPromotion.owner_benefit.owner_constraint
								}}
							</h3>
						</div>
					</div>
				</div>
				<button class="py-3 rounded-md text-white bg-black px-3 text-sm">
					End promo code
				</button>
			</div>
			<Skeleton v-else width="500px" height="300px" />
			<div class="w-7/12 shadow-md border-[0.4px] rounded-md">
				<Table :loading="loading" :headers="tableFields" :table-data="formattedUsersPromoList" :has-index="true">
					<template #item="{ item }">
						<span v-if="item.created_at">
							{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
						</span>
						<span v-else-if="item.status">
							<StatusBadge :name="item.data.status === 1 ? 'active' : 'inactive'" />
						</span>
					</template>
				</Table>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { usePromoIdDetails } from '@/composables/modules/promocodes/id'
const { selectedPromotion, loading, getPromoById } = usePromoIdDetails()
const id = useRoute().params.id as string
getPromoById(id)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedUsersPromoList = computed(() => {
    if (!selectedPromotion.value.users) return []
    return selectedPromotion?.value?.users.map((i) => {
        return {
            ...i,
            user_type: i?.user_type,
            user: `${i?.customer?.fname} ${i?.customer?.lname}`,
            date_applied: useDateFormat(i?.created_at, 'HH:mm:ss AA').value,
            status: !i?.has_promotion_expired ? 1 : 0
        }
    })
})

const computedPromoCodeDetails = computed(() => {
    return {
        Name: selectedPromotion?.value?.name,
        Description: selectedPromotion?.value?.description,
        'Promo Code': selectedPromotion?.value?.promo_code,
        'Expires At': selectedPromotion.value.expires_at ? useDateFormat(selectedPromotion.value.expires_at, 'HH:mm:ss AA').value : 'Never',
        'MAXIMUM NUMBER OF USES': selectedPromotion?.value?.max_number_of_uses,
        'NUMBER OF USAGES': selectedPromotion?.value?.number_of_usages,
        'Customer Benefits': selectedPromotion?.value?.cust_benefit,
        'Owner Benefits': selectedPromotion?.value?.owner_benefit
    }
})

const tableFields = ref([

    {
        text: 'USER  TYPE',
        value: 'user_type'
    },
    {
        text: 'USER',
        value: 'user'
    },
    {
        text: 'APPLIED AT',
        value: 'date_applied'
    },
    {
        text: 'STATUS',
        value: 'status'
    }

])

</script>

<style scoped></style>
