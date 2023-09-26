export const convertToCurrency = (value: number) => {
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
    if (input.length <= maxLength) {
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
