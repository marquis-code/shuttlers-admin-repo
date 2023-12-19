import { useResizeObserver } from '@vueuse/core'

export const windowWidth = ref(window.innerWidth)

  useResizeObserver(window.document.body, (entries) => {
      const entry = entries[0]
	  const { width } = entry.contentRect
	  windowWidth.value = width
    })
