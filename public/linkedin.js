_linkedin_partner_id = 5142649
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
window._linkedin_data_partner_ids.push(_linkedin_partner_id);

(function (l) {
  if (!l) {
    window.lintrk = function (a, b) {
      window.lintrk.q.push([a, b])
    }
    window.lintrk.q = []
  }
  const s = document.getElementsByTagName('script')[0]
  const b = document.createElement('script')
  b.type = 'text/javascript'
  b.async = true
  b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
  s.parentNode.insertBefore(b, s)
})(window.lintrk)
