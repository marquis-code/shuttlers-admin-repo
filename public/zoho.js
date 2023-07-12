const isWebView = () => {
	const standalone = window.navigator.standalone
	const userAgent = window.navigator.userAgent.toLowerCase()
	const safari = /safari/.test(userAgent)
	const ios = /iphone|ipod|ipad/.test(userAgent)

	if (ios) {
		if (!standalone && safari) {
			return false
		} else if (!standalone && !safari) {
			return true
		}
	} else if (userAgent.includes('wv')) {
		return true
	} else {
		return false
	}
}

if (location.hostname !== 'localhost' && !isWebView()) {
var $zoho = $zoho || {}
$zoho.salesiq = $zoho.salesiq || { widgetcode: '422e1cacdcc93da7c9f44fd1f00755a1e2a9bab800dd2fb82e7b2571a045feb9e6550238dd8f55574e883ef8424d6aba', values: {}, ready: function () { } }
const d = document
const s = d.createElement('script')
s.type = 'text/javascript'
s.id = 'zsiqscript'
s.defer = true
s.src = 'https://salesiq.zoho.com/widget'
const t = d.getElementsByTagName('script')[0]
t.parentNode.insertBefore(s, t)
 }

   window.dataLayer = window.dataLayer || []
  function gtag() { dataLayer.push(arguments) }
