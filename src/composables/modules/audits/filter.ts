import { watch } from 'vue'
import { allAdmins } from './fetch'

const filter = ref(false)
const typeStatus = ref(false)
const actorStatus = ref(false)
const allTypes = ['Normal', 'Important', 'Critical']
const selectedType = ref([]) as Ref<string[]>
const computedSelectedType = computed(() => {
	if (selectedType.value.length) {
		return selectedType.value.join(',')
	}
	return ''
})
const selectedAdmin = ref([]) as Ref<Record<string, any>[]>
const selectedAdminIds = computed(() => selectedAdmin.value.map((el) => el.id as number))
const searchText = ref('')

export const useAuditFilter = () => {
	const closeAllFilterBox = () => {
		filter.value = false
		typeStatus.value = false
		actorStatus.value = false
	}
	const openTypeFilter = () => {
		actorStatus.value = false
		typeStatus.value = true
	}
	const openActorFilter = () => {
		typeStatus.value = false
		actorStatus.value = true
	}
	const adjustTypeFilter = (str:string) => {
		if (!selectedType.value.includes(str)) {
			selectedType.value.push(str)
		} else {
			const index = selectedType.value.indexOf(str)
			selectedType.value.splice(index, 1)
		}
	}

	const adjustActorFilter = (admin:Record<string, any>) => {
		if (!selectedAdminIds.value.includes(admin?.id)) {
			selectedAdmin.value.push(admin)
		} else {
			selectedAdmin.value = selectedAdmin.value.filter((el) => el.id !== admin?.id)
		}
	}
	const filteredAdmin = computed(() => {
		return allAdmins.value.filter((obj: Record<string, any>) =>
			obj.fname.toLowerCase().includes(searchText.value.toLowerCase()) ||
			obj.lname.toLowerCase().includes(searchText.value.toLowerCase()))
	})

	return { filter, typeStatus, actorStatus, allTypes, selectedType, selectedAdmin, selectedAdminIds, searchText, closeAllFilterBox, openTypeFilter, openActorFilter, adjustTypeFilter, adjustActorFilter, filteredAdmin, computedSelectedType }
}
