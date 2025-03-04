import { PAGINATION_LIMIT } from '@/composables/utils/constant'

export type TMetaObject = {
  page: Ref<number>;
  page_size: Ref<number>; // Assuming PAGINATION_LIMIT is a constant number
  total: Ref<number>;
  total_pages?: Ref<number>
}

export const usePagination = () => {
    let fetchFunc: (id: boolean) => Promise<void> = async () => {}
    const metaObject = {
		page: ref(1),
		page_size: ref(PAGINATION_LIMIT),
        total: ref(1),
        total_pages: ref(1)
        }

    const showLoadMore = computed(() => {
        const sigh = metaObject.total.value - metaObject.page.value * metaObject.page_size.value
		return sigh > 0
    })
    const next = async () => {
        if (metaObject.page.value === metaObject.total.value) return
        metaObject.page.value++
        await fetchFunc(false)
    }

    const prev = async () => {
        if (metaObject.page.value <= 1) return
        metaObject.page.value--
        await fetchFunc(false)
    }
    const moveTo = async (page: number) => {
        if (page === 0 || typeof page !== 'number') return

        metaObject.page.value = page
        await fetchFunc(false)
    }

	const loadMore = async() => {
        metaObject.page.value++
        await fetchFunc(true)
    }

    const setFunction = (data:any) => {
        fetchFunc = data
    }

    watch(metaObject.page_size, () => {
        metaObject.page.value = 1
        fetchFunc(false)
    })

    return { metaObject, showLoadMore, loadMore, setFunction, next, prev, moveTo }
}

export const useTableFilter = (filterData?: Record<string, Ref>) => {
    if (!filterData) return ''
    return Object.keys(filterData)
        .filter((key) => filterData[key].value !== '')
        .map((key) => `${encodeURIComponent(key)}=${filterData[key].value}`)
        .join('&')
}
// .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filterData[key].value)}`)
