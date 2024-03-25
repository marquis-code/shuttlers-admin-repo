const cardIsOpen = ref(false)
const loading = ref(false)
export const useOpenRouteRequest = () => {
    const openCard = async (data: any) => {
        cardIsOpen.value = true
    }

    const closeCard = () => {
        cardIsOpen.value = false
        loading.value = false
    }

    return { loading, cardIsOpen, openCard, closeCard }
}
