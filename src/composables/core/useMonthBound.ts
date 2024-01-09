export const useMonthBounds = () => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    return {
        firstDayOfMonth: formatDate(firstDayOfMonth),
        lastDayOfMonth: formatDate(lastDayOfMonth)
    }
}
