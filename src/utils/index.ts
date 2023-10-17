const environmental_url = {
  test: 'https://v3.test.admin.shuttlers.africa',
  staging: 'https://v3.qa.admin.shuttlers.africa',
  prod: 'https://v3.admin.shuttlers.africa'
}


export const openAsExternalUrl = (url) => { 
  const b64 = btoa(JSON.stringify(currentUser.value.token.token))
  switch (process.env.VUE_APP_ENV_ALIAS) { 
    case 'test':
    case 'TEST':
      window.location.href = `${environmental_url.test}/redirect/?path=${url}&token=${b64}`
      break
    case 'staging':
    case 'QA':
      window.location.href = `${environmental_url.staging}/redirect/?path=${url}&token=${b64}`
      break
    case 'prod':
    case 'PROD':
      window.location.href = `${environmental_url.prod}/redirect/?path=${url}&token=${b64}`
      break
    default:
      window.location.href = `${environmental_url.prod}/redirect/?path=${url}&token=${b64}`
      break
  }
}