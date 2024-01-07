const ALERT_DURATION = 5000

const loadingState = {
  active: ref(false),
  message: ref('')
}

const openAlertArray = ref([] as Record<string, any>[])

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS' | 'WARNING'
	msg: string
}

export const useAlert = () => {
	const openAlert = ({ type, msg }: AlertTypes) => {
		const id = Date.now().toString()
		openAlertArray.value.push({ id, type, msg })
	}
	const closeAlert = (id:string) => {
		openAlertArray.value = openAlertArray.value.filter((alert: any) => alert.id !== id)
	}

	return { openAlert, closeAlert, ALERT_DURATION, openAlertArray }
}

export const useLoading = () => {
  const openLoading = (msg: string) => {
    loadingState.message.value = msg
    loadingState.active.value = true
  }
  const closeLoading = () => {
    loadingState.message.value = ''
    loadingState.active.value = false
  }
  return { ...loadingState, openLoading, closeLoading }
}
