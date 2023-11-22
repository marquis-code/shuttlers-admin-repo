import 'core-js/actual/array/group-by'
  export const manifest = ref({} as any)
  export const groupSortedPickupManifestByPickupName = () => {
    const manifestSortedByPickupPosition = [...manifest]

    manifestSortedByPickupPosition.sort(function (a, b) {
      return a.pickupRouteBusStop.position - b.pickupRouteBusStop.position
    })
    const response = manifestSortedByPickupPosition.groupBy((user) => {
      return user.pickupRouteBusStop.name
    })

    return response
  }

  export const groupSortedDestinationManifestByDestinationName = () => {
    const manifestSortedByDestinationPositionAndReversed = [...manifest]

    manifestSortedByDestinationPositionAndReversed.sort(function (a, b) {
      return a.destinationRouteBusStop.position - b.destinationRouteBusStop.position
    }).reverse()
    // const ps = manifestSortedByDestinationPositionAndReversed.map(pass => pass.destinationRouteBusStop.position)
    const response = manifestSortedByDestinationPositionAndReversed.groupBy((user) => {
      return user.destinationRouteBusStop.name
    })
    // return response

    return response
  }
