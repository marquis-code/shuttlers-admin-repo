export const useMergeArrays = (array1, array2) => {
  const mergedArray = array1.map((item1) => {
    const match = array2.find((item2) => Number(item2.parameter_id) === Number(item1.id))
    if (match) {
      return { ...item1, rating: match.average, trip_count: match.total }
    }
    return { ...item1, rating: 0, trip_count: 0 }
  })

  return mergedArray
}
