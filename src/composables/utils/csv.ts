import Papa from 'papaparse/papaparse.js'
import { generateCsv, mkConfig } from 'export-to-csv'

export function exportAsCsv(data: any[], fileName: string) {
	const csv = Papa.unparse(data)
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
const loading = ref(false)

export const useDownloadReport = () => {
	const csvConfig = mkConfig({ useKeysAsHeaders: true })

	const download = (csvData: Record<string, any>[], title) => {
		loading.value = true
		const csv = generateCsv(csvConfig)(csvData)
		const filename = `${title}.csv`
		// @ts-ignore
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = filename
		link.style.display = 'none'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		loading.value = false
	}

	return { download, loading }
}
