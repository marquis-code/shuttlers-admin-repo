export const formatNumberToMoney = (
  number = 0,
  decimals = 0,
  { countryCode = 'NG', currencyCode }: { countryCode?: string; currencyCode?: string } = {}
): string => {
  const formatter = new Intl.NumberFormat(`en-${countryCode}`, {
    style: currencyCode ? 'currency' : 'decimal',
    currency: currencyCode,
    minimumFractionDigits: decimals
  })
  return formatter.format(number ? +number.toFixed(decimals || 2) : 0)
}

export const truncateString = (input: string, maxLength = 80): string => {
    if (input.length <= maxLength) {
        return input
    } else {
        return input.slice(0, maxLength) + '...'
    }
}
