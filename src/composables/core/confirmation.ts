import { useCoreModal } from './modals'

const confirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false),
    proceedText: ref('Yes'),
    cancelText: ref('No')
}

const passwordConfirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false),
    password: ref(''),
    reason: ref(null as string|null)
}

const YesConfirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false)
}

interface AlertTypes {
	type: 'DANGER' | 'NORMAL' | 'SUCCESS'
	desc: string
    title: string
    call_function: () => void
    loading: Ref<boolean>,
    password?: Ref<string>,
    reason?: Ref<string | null>,
    proceedText?: string,
    cancelText?: string
}

export const useConfirmationModal = () => {
    const { openConfirm, closeConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading, proceedText = 'Yes', cancelText = 'No' }: AlertTypes) => {
		confirmationState.type.value = type
        confirmationState.description.value = desc
        confirmationState.title.value = title
        confirmationState.call_function.value = call_function
        confirmationState.loading = loading
        confirmationState.proceedText.value = proceedText
        confirmationState.cancelText.value = cancelText

        openConfirm()
	}
	const closeAlert = () => {
        confirmationState.description.value = ''
        confirmationState.title.value = ''
        confirmationState.call_function.value = () => { }
        confirmationState.proceedText.value = 'Yes'
        confirmationState.cancelText.value = 'No'
        closeConfirm()
	}

	return { ...confirmationState, openAlert, closeAlert }
}
export const usePasswordConfirmationModal = () => {
    const { openPasswordConfirm, closePasswordConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading, password = ref(''), reason = ref(null) }: AlertTypes) => {
		passwordConfirmationState.type.value = type
        passwordConfirmationState.description.value = desc
        passwordConfirmationState.title.value = title
        passwordConfirmationState.call_function.value = call_function
        passwordConfirmationState.loading = loading
        passwordConfirmationState.password = password
        passwordConfirmationState.reason = reason

        openPasswordConfirm()
	}
	const closeAlert = () => {
        passwordConfirmationState.description.value = ''
        passwordConfirmationState.title.value = ''
        passwordConfirmationState.call_function.value = () => { }
        passwordConfirmationState.password.value = ''

        closePasswordConfirm()
	}

	return { ...passwordConfirmationState, openAlert, closeAlert }
}
export const useYesConfirmationModal = () => {
    const { openYesConfirm, closeYesConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading }: AlertTypes) => {
		YesConfirmationState.type.value = type
        YesConfirmationState.description.value = desc
        YesConfirmationState.title.value = title
        YesConfirmationState.call_function.value = call_function
        YesConfirmationState.loading = loading

        openYesConfirm()
	}
	const closeAlert = () => {
        YesConfirmationState.description.value = ''
        YesConfirmationState.title.value = ''
        YesConfirmationState.call_function.value = () => { }

        closeYesConfirm()
	}

	return { ...YesConfirmationState, openAlert, closeAlert }
}
