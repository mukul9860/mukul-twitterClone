import { useEffect, useState } from "react";

const loadTweets = (callback) => {
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
  xmlhtreq.onerror = function (e) {
    console.log(e)
    callback({ "message": "Could not connect to server" }, 400)
  }
  xmlhtreq.send()
}

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if (status === 200) {
        setTweets(response)
      }
      else {
        alert("Could not connect to server...Please try again.")
      }
    }
    loadTweets(myCallback)
  }, [])

  return (
    <div >
      <h2>Welcome to Mukul Twitter App</h2>
      <p>
        {tweets.map((tweet, index) => {
          return <li>{tweet.content}</li>
        })}
      </p>
    </div>
  );
}

export default App;
