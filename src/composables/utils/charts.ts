import { isEmptyObject } from './basics'

const MONTHS: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

interface Config {
  count?: number;
  section?: number;
}

export function months(config?: Config): string[] {
  const cfg = config || {}
  const count = cfg.count || 12
  const section = cfg.section
  const values: string[] = []
  let i, value

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12]
    values.push(value.substring(0, section))
  }

  return values
}

interface Datum {
  month: number;
  total: number;
  created_at: string;
  date: string;
  total_rating: number;
  total_passengers: number;
}

export function getYearlyBarChartData(data: Datum[]): any {
  if (!data || isEmptyObject(data as any)) return {}

  const labels = months({ count: 12 })

  const mappedData: number[] = []

  for (const i of Array(12).keys()) {
    const datum = data.find((d) => d.month === i + 1)
    const currentMonth = new Date().getMonth() + 1

    if (datum && datum.month <= currentMonth) {
      mappedData.push(datum.total)
    } else {
      mappedData.push(0)
    }
  }

  return {
    labels,
    datasets: [
      {
        backgroundColor: '#00e069',
        data: mappedData,
        barThickness: 22
      }
    ]
  }
}

export function getDailyBarChartData(data: Datum[]): any {
  const daysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()

  const labels: string[] = []

  const mappedData: number[] = []
  for (const i of Array(daysCount).keys()) {
    labels.push(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).toDateString())
    const datum = data.find((d) => new Date(d.created_at).getDate() === i + 1)
    if (datum) {
      mappedData.push(datum.total)
    } else {
      mappedData.push(0)
    }
  }

  return {
    labels,
    datasets: [
      {
        backgroundColor: '#00e069',
        data: mappedData,
        barThickness: 22
      }
    ]
  }
}

export function getRatingsChartData(data: Datum[]): any {
  const labels = data.map((d) => d.date)
  const dailyRatingsByPassengersData = data.map((d) => d.total_rating)
  const dailyNoRatingsByPassengersData = data.map((d) => d.total_passengers - d.total_rating)

  return {
    labels,
    datasets: [
      {
        barThickness: 22,
        label: 'No. of passengers that rated trip',
        data: dailyRatingsByPassengersData,
        backgroundColor: '#20E682',
        stack: 'Ratings Stack'
      },
      {
        label: 'Total passengers on trip',
        data: dailyNoRatingsByPassengersData,
        backgroundColor: '#E0E6ED',
        stack: 'Ratings Stack',
        barThickness: 22
      }
    ]
  }
}
