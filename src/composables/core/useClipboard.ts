import { useAlert } from '@/composables/core/notification'
export function useClipboard() {
    const copyToClipboard = (text) => {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      useAlert().openAlert({ type: 'SUCCESS', msg: 'Copied to clipboard!' })
    }

    return { copyToClipboard }
  }
