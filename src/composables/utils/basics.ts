export const isEmptyObject = (obj: Record<string, unknown>) => {
  if (!obj) return true
  return Object.keys(obj).length === 0
}
