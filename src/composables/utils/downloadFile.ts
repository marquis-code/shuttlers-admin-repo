export const useFileDownloadFromUrl = () => {
    function downloadFile(url, fileName) {
        const link = document.createElement('a')

        link.download = fileName || 'downloadedFile'
        link.href = url

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
      }
      return { downloadFile }
  }
