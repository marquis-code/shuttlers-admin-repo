import { watch } from 'vue'
import { allAdmins, auditOperationTypes } from './fetch'

const filter = ref(false)
const typeStatus = ref(false)
const actorStatus = ref(false)
const operationTypeStatus = ref(false)
const allTypes = ['Normal', 'Important', 'Critical']
const selectedType = ref([]) as Ref<string[]>
const computedSelectedType = computed(() => {
	if (selectedType.value.length) {
		return selectedType.value.join(',')
	}
	return ''
})
const selectedAdmin = ref([]) as Ref<Record<string, any>[]>
const selectedOperationType = ref([]) as Ref<string[]>
const computedSelectedOperationType = computed(() => {
	if (selectedOperationType.value.length) {
		return selectedOperationType.value.join(',')
	}
	return ''
})
const selectedAdminIds = computed(() => selectedAdmin.value.map((el) => el.id as number))
const searchText = ref('')
const operationTypeSearch = ref('')

const cleanString = (str: string) => {
	return str.replace('-', ' ')
}

export const useAuditFilter = () => {
	const closeAllFilterBox = () => {
		filter.value = false
		typeStatus.value = false
		actorStatus.value = false
		operationTypeStatus.value = false
	}
	const closeOtherFilterBox = () => {
		typeStatus.value = false
		actorStatus.value = false
		operationTypeStatus.value = false
	}
	const openTypeFilter = () => {
		closeOtherFilterBox()
		typeStatus.value = true
	}
	const openActorFilter = () => {
		closeOtherFilterBox()
		actorStatus.value = true
	}
	const openOperationTypeFilter = () => {
		closeOtherFilterBox()
		operationTypeStatus.value = true
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
	const adjustOperationTypeFilter = (str:string) => {
		if (!selectedOperationType.value.includes(str)) {
			selectedOperationType.value.push(str)
		} else {
			const index = selectedOperationType.value.indexOf(str)
			selectedOperationType.value.splice(index, 1)
		}
	}
	const filteredAdmin = computed(() => {
		return allAdmins.value.filter((obj: Record<string, any>) =>
			obj.fname.toLowerCase().includes(searchText.value.toLowerCase()) ||
			obj.lname.toLowerCase().includes(searchText.value.toLowerCase()))
	})

	const filteredOperationTypes = computed(() => {
		return auditOperationTypes.value.filter((el: string) =>
			cleanString(el).toLowerCase().includes(operationTypeSearch.value.toLowerCase())
		)
	})

	return { filter, typeStatus, actorStatus, allTypes, selectedType, selectedAdmin, selectedAdminIds, searchText, closeAllFilterBox, openTypeFilter, openActorFilter, adjustTypeFilter, adjustActorFilter, filteredAdmin, computedSelectedType, operationTypeSearch, operationTypeStatus, openOperationTypeFilter, adjustOperationTypeFilter, filteredOperationTypes, selectedOperationType, cleanString, computedSelectedOperationType }
}
