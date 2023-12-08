import { useAlert } from '@/composables/core/notification'
export default function useCsvDownload() {
  const downloading = ref(false)
  const templateName = ref('')

  const downloadCsv = () => {
    if (downloading.value) {
      return
    }

    downloading.value = true

    try {
      const csvData = 'email\n'
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', templateName.value || 'batch-booking-users.csv')
      document.body.appendChild(link)
      link.click()
      useAlert().openAlert({ type: 'Alert', msg: 'Template was downloaded successfully.' })
    } catch (error) {
      useAlert().openAlert({ type: 'Alert', msg: `'Error downloading CSV:', ${error}` })
    } finally {
      downloading.value = false
    }
  }

  return { downloadCsv, downloading, templateName }
}
