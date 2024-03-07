export const useMergeVehiclesWithAverage = () => {
  const mergeWithAverage = (driversList, ratingsList) => {
    const mergedVehicles = driversList?.map((driver:any) => {
      const matchingParameter = ratingsList?.find((p:any) => Number(p.parameter_id) === Number(driver.vehicle_id))
      const average = matchingParameter ? matchingParameter.average : 0
      return { ...driver, average }
    })
    return mergedVehicles
  }
  return { mergeWithAverage }
}
