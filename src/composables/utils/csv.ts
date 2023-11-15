import Papa from 'papaparse/papaparse.js'

export function exportAsCsv(data:any[], fileName:string) {
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
