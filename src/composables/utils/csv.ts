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
const _title = ref('')
let _csvData = ref()

export const useDownloadReport = () => {
	const csvConfig = mkConfig({ useKeysAsHeaders: true })
	const download = () => {
		loading.value = true
		const csv = generateCsv(csvConfig)(_csvData.value)
		const filename = `${_title.value}.csv`
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

	const set_csvData = (csvData: Ref<Record<string, any>>, title) => {
		_csvData = csvData
		_title.value = title
	}

	return { download, loading, set_csvData }
}
