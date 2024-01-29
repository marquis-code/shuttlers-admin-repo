export const useDaysInMonth = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    // Start from the first day of the month
    const daysArray = []
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day + 1)
        daysArray.push(formatDate(date))
    }

    return daysArray
}
