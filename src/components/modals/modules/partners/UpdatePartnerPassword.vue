<template>
	<Modal
		modal="$atts.modal"
		title="Update Partner Password"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updatePartnerPassword">
			<div class="flex flex-col gap-2">
				<label class="label">Password</label>
				<div class="w-full h-[50px] relative">
					<input v-model="password" required :type="show ? 'text' : 'password'" class="input-field">
					<button type="button" class="text-xs text-dark font-medium absolute top-4 right-2"
						@click="show = !show"
					>
						{{ show ? 'hide' : 'show' }}
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label class="label">Confirm Password</label>
				<div class="w-full h-[50px] relative">
					<input v-model="c_password" required :type="show ? 'text' : 'password'" class="input-field">
					<button type="button" class="text-xs text-dark font-medium absolute top-4 right-2"
						@click="show = !show"
					>
						{{ show ? 'hide' : 'show' }}
					</button>
				</div>
				<p v-if="c_password && c_password !== password" class="text-xs text-red font-medium">
					Password doesn\'t match
				</p>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Update Partner' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdatePartnerPassword } from '@/composables/modules/partners'

const { loading, clearObj, password, c_password, updatePartnerPassword } = useUpdatePartnerPassword()
const show = ref(false)

const enableButton = computed(() => {
	return !!(password.value === c_password.value)
})
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
