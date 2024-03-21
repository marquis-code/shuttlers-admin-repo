interface DateObject {
  date: string;
  passengers: number;
  data: any[];
}

interface WeekGroup {
  week: number;
  dates: DateObject[];
}

const dates = ref([]) as any

export function useDateGrouping() {
  const currentWeek = ref(1) as any
  const weekGroups = ref([]) as any

  const calculateWeekNumber = (date: Date, monthStartDay: number) => {
    const diff = date.getDate() + (monthStartDay - 1)
    return Math.ceil(diff / 7)
  }

  const groupDates = () => {
   if (dates.value) {
    const groups: WeekGroup[] = []
    const monthStart = new Date(dates?.value[0]?.date)
    const monthStartDay = monthStart.getDay()

    dates.value.forEach((dateObj: any) => {
      const date = new Date(dateObj?.date)
      const weekNum = calculateWeekNumber(date, monthStartDay)
      let weekGroup = groups.find((g) => g?.week === weekNum)
      if (!weekGroup) {
        weekGroup = { week: weekNum, dates: [] }
        groups.push(weekGroup)
      }
      weekGroup.dates.push(dateObj)
    })

    weekGroups.value = groups
   }
  }

  watch(dates, groupDates, { immediate: true })

  const setCurrentWeek = (weekNumber: number) => {
    currentWeek.value = weekNumber
  }

  const currentWeekDates = computed(() => {
    return weekGroups.value.find((group: any) => group.week === currentWeek.value)?.dates || []
  })

    const setDataPayload = (data: any) => {
    dates.value = data
  }

  return {
    setCurrentWeek,
    currentWeekDates,
    setDataPayload,
    weekNumbers: computed(() => weekGroups.value.map((group: any) => group.week))
  }
}
