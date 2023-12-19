export const useDateFormatter = (date) => {
    function getYear(date) {
      return date.getFullYear()
    }

    function getMonth(date) {
      return (date.getMonth() + 1).toString().padStart(2, '0')
    }

    function getDay(date) {
      return date.getDate().toString().padStart(2, '0')
    }

    function formatDateToYYYYMMDD() {
      const year = getYear(date)
      const month = getMonth(date)
      const day = getDay(date)

      return `${year}-${month}-${day}`
    }

    return {
      formatDateToYYYYMMDD
    }
  }
