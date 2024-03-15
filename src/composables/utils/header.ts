type headstateTypes = {
    preTitle?: string
    title: string
    loading?: Ref<boolean>
}

const headstate = {
    preTitle: ref('.'),
    title: ref('Loading...'),
    loading: ref(false)
}

export const usePageHeader = () => {
    const setPageHeader = ({ preTitle = 'Overview', title = 'The UnNamed Title', loading = headstate.loading }: headstateTypes) => {
        headstate.preTitle.value = preTitle
        headstate.title.value = title
        headstate.loading = loading
    }

    return { headstate, setPageHeader }
}
