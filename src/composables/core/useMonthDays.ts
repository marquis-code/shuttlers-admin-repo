export const useDaysInMonth = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    // Find the first Monday of the month
    const firstMonday = new Date(year, month, 1)
    while (firstMonday.getDay() !== 1) {
        firstMonday.setDate(firstMonday.getDate() + 1)
    }

    const daysArray = []
    for (let day = firstMonday.getDate(); day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        daysArray.push(formatDate(date))
    }

    return daysArray
}
