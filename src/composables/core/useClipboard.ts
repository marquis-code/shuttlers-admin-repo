export function useClipboard() {
    const copyToClipboard = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Text copied to clipboard!');
    };
  
    return { copyToClipboard };
  }