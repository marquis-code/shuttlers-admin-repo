export const useWeekBounds = () => {
    const today = new Date()
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    const lastDayOfWeek = new Date(firstDayOfWeek.getTime())

    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    return {
        firstDayOfWeek: formatDate(firstDayOfWeek),
        lastDayOfWeek: formatDate(lastDayOfWeek)
    }
}
