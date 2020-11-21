class Http {
  get(url) {
    return sendRequest('GET', url)
  }

  post(url){
    return sendRequest('POST', url)
  }
}

function sendRequest(method, url, data = {}) {
  return fetch(url, {method})
    .then( response => response.json() )
}

export const http = new Http()