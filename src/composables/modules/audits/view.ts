const details = ref(null) as Ref<Record<string, any>|null>
const oldData = ref(null) as Ref<Record<string, any>|null>
const newData = ref(null) as Ref<Record<string, any>|null>

export const useViewAuditDetails = () => {
	const clearUpdatedData = () => {
		oldData.value = null
		newData.value = null
	}
	const showDataDetails = (data: Record<string, any>) => {
		clearUpdatedData()
		if (data.auditType === 'UPDATE') handleDataChanges(data)
		details.value = data
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function isObjectNotEmpty(obj: Record<string, any>) {
	  return Object.keys(obj).length > 0
	}

	function flattenObject(obj: Record<string, any>) {
	  const result = {}

	  function recurse(current) {
		for (const key in current) {
		  if (current[key] && typeof current[key] === 'object') {
			recurse(current[key])
		  } else {
			result[key] = current[key]
		  }
		}
	  }

	  recurse(obj)
	  return result
	}
	const handleDataChanges = (data: Record<string, any>) => {
		if (isObjectNotEmpty(data?.oldData)) {
			oldData.value = flattenObject(data?.oldData)
		}
		if (isObjectNotEmpty(data?.newData)) {
			newData.value = flattenObject(data?.newData)
		}
	}
	const all_new_data_keys = computed(() => {
		if (newData.value) return Object.keys(newData.value)
		return []
	})

	return { details, newData, oldData, clearUpdatedData, showDataDetails, handleDataChanges, all_new_data_keys }
}
