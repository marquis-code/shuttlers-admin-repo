export const useCommandPalette = () => {
    const search = ref('')

 const allCommandPaletteQuickRoute = computed(() => {
    const allRoutes = useRouter().getRoutes()
    const res = allRoutes.map((item:Record<string, any>) => {
        return {
            id: item.name,
            name: item.name.split('-').join(' '),
            path: item.path,
            readablePath: item.path.split('/').filter((i) => i !== '').join(' > ')
        }
    }).filter((i) => !i.path.includes(':id()'))

    console.log(res)
    return res
})

const shortenedCommandPalleteQuick = computed(() => {
    return allCommandPaletteQuickRoute.value.slice(0, 7)
})

    const searchResult = computed(() => {
        if (search.value) {
            return allCommandPaletteQuickRoute.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
        } else {
            return shortenedCommandPalleteQuick.value
        }
    })

    return { search, shortenedCommandPalleteQuick, allCommandPaletteQuickRoute, searchResult }
}
