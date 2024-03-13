import Fuse from 'fuse.js'

export const useCommandPalette = () => {
    const search = ref('')

 const allCommandPaletteQuickRoute = computed(() => {
    const allRoutes = useRouter().getRoutes()
    return allRoutes.map((item:Record<string, any>) => {
        return {
            id: item.name,
            name: item.name.split('-').join(' '),
            path: item.path,
            readablePath: item.path.split('/').filter((i) => i !== '').join(' > ')
        }
    }).filter((i) => !i.path.includes(':id()'))
})

        const fuse = new Fuse(allCommandPaletteQuickRoute.value, {
        keys: ['name', 'path', 'readablePath'], // Define which object keys to search in
        includeScore: true, // Include the search score in the result
        threshold: 0.5, // Tweak this value to be more or less strict. Lower means more strict.
        useExtendedSearch: true
    })

    const searchResult = computed(() => {
        if (search.value) {
            const searchWords = search.value.trim().split(/\s+/)
            const pattern = searchWords.map((word) => `+${word}`).join(' ')
            return fuse.search(pattern).map((result) => result.item)
        } else {
            return allCommandPaletteQuickRoute.value.slice(0, 7)
        }
    })

    return { search, allCommandPaletteQuickRoute, searchResult }
}
