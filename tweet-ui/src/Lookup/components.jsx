export const loadTweets = (callback) => {
    // Getting data from "/tweets" here using XMLHttpRequest
    const xmlhtreq = new XMLHttpRequest()           // instance of new XMLHttpRequest
    const method = 'GET'
    const url = "http://localhost:8000/api/tweets/"
    const resType = "json"                    // response type of data
    xmlhtreq.responseType = resType
    xmlhtreq.open(method, url)
    xmlhtreq.onload = function () {
      callback(xmlhtreq.response, xmlhtreq.status)
    }
    xmlhtreq.onerror = (e) => {
      console.log(e)
      callback({"Message": "Could not connect to server..."}, 400);
    }
    xmlhtreq.send()
  }