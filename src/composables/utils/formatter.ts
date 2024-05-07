import moment from 'moment'

export const convertToCurrency = (value: number) => {
    if (value === 0) return 0
    if (!value) return
    if (typeof value === 'undefined') return

  let parseAmount
  if (typeof value !== 'number') {
       parseAmount = parseFloat((value as string).replace(',', '').replace(' ', ''))
  } else {
       parseAmount = value
  }
  return new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
}).format(parseAmount)
}

export const truncateString = (input: string, maxLength = 80): string => {
    if (!input) return ''
    if (input?.length <= maxLength) {
        return input
    } else {
        return input.slice(0, maxLength) + '...'
    }
}

export const convertObjWithRefToObj = (obj: Record<string, Ref>, ignoreKeys: string[] = []) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !ignoreKeys.includes(key)).map(([key, value]) => [key, value.value])
    )
}
export const convertLatLngStringToObj = (latLngString: string) => {
    if (!latLngString) return { x: 0, y: 0 }
    const [lat, lng] = latLngString.split(',')
    return { y: parseFloat(lat), x: parseFloat(lng) }
}

export const dayIsInThePast = (trip_date: string) => {
	const today = moment()
			const formatted = moment(trip_date)

			const differenceInDays = formatted.diff(today, 'days')
			return differenceInDays < 0
}

export const Capitalize = (str:string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatDateToGetTheLastDay = (dateString:string) => {
    const dateStr = dateString
    const dateParts = dateStr.split('-')
    const year = parseInt(dateParts[0])
    const month = parseInt(dateParts[1])
    const date = new Date(year, month, 0)
    const lastDayOfMonth = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    return lastDayOfMonth
}

export const isValidJsonString = (str) => {
      try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true

    // try {
    //     const o = JSON.parse(jsonString)

    //     // Handle non-exception-throwing cases:
    //     // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    //     // but... JSON.parse(null) returns null, and typeof null === "object",
    //     // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    //     if (o && typeof o === 'object') {
    //         return o
    //     }
    // } catch (e) { }

    // return false
}

export const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(email)
}
