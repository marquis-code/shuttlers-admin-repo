import { Ref, ref } from 'vue'

export function useMonthBoundaries(year: number, month: number): { firstDay: Ref<string>; lastDay: Ref<string> } {
  const firstDay = new Date(Date.UTC(year, month, 1, 23, 0, 0)).toISOString() as any
  const lastDay = new Date(Date.UTC(year, month + 1, 0, 23, 0, 0)).toISOString() as any
  return {
    firstDay: ref(firstDay),
    lastDay: ref(lastDay)
  }
}
