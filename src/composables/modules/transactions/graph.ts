// import { format, parseISO } from 'date-fns'

export const last30DaysTransactions = ref({})
export const transactionsDistrubution = ref({})

export const setTransactionsChartData = (graphData:any) => {
	if (Object.keys(graphData.value).length === 0) return
  const credits = [] as any[]
  const debits = [] as any[]
  const mappedData = {}
  for (const datum of graphData.value) {
    const dayInMonth = format(parseISO(datum.created_at), 'd-MM')
    if (mappedData[dayInMonth] && mappedData[dayInMonth][datum.type]) {
      mappedData[dayInMonth][datum.type] =
        mappedData[dayInMonth][datum.type] + parseFloat(datum.amount)
    } else {
      mappedData[dayInMonth] = {
        ...mappedData[dayInMonth],
        [datum.type]: parseFloat(datum.amount)
      }
    }
  }
  Object.values(mappedData)?.forEach((datum:any) => {
    if (datum.credit) {
      credits.push(datum.credit)
    }
    if (datum.debit) {
      debits.push(datum.debit)
    }
  })
  last30DaysTransactions.value = {
    labels: Object.keys(mappedData),
    datasets: [
      {
        label: 'Wallet Funding',
        backgroundColor: 'transparent',
        borderColor: '#00e069',
        data: credits
      },
      {
        label: 'Wallet Spends',
        backgroundColor: 'transparent',
        borderColor: '#fc7171',
        data: debits
      }
    ]
  }
  transactionsDistrubution.value = {
    labels: ['Wallet Funding', 'Wallet Spending'],
    datasets: [
      {
        data: [
          credits.reduce((sum, credit) => sum + credit, 0),
          debits.reduce((sum, debit) => sum + debit, 0)
        ],
        backgroundColor: ['#00e069', '#fc7171']
      }
    ]
  }
}
