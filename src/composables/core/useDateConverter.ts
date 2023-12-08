export const useConvertDate = () => {
    const convertDateFormat = (inputDateString) => {
        const inputDate = new Date(inputDateString)

        if (isNaN(inputDate.getTime())) {
          return 'Invalid date'
        }

        const outputDateString = inputDate.toISOString()

        return outputDateString
      }

      return { convertDateFormat }
}
