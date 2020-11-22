class Http {
  get(url) {
    return sendRequest('GET', url)
  }

  post(url, data){
    return sendRequest('POST', url, data)
  }
}

function sendRequest(method, url, data = {}) {
  return fetch(url, {method})
    .then( response => {
      if( response.ok)  {
        let json = response.json()
        return json
      }     
    })
}

export const http = new Http()