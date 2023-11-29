import { ref } from 'vue'

const loading = ref(false)

export const useUpdateIssues = () => {
	const initUpdate = () => {
		loading.value = true
	}

	return { loading, initUpdate }
}
