import { useEffect, useState } from 'react';
import { loadTweets } from '../Lookup';
  
 export const TweetsList = (props) => {
    const [tweets, setTweets] = useState([]);
  
    useEffect(() => {
      const callbackFunc = (response, status) => {
        if (status === 200) {
          setTweets(response)
        }
        else {
          alert("Could not connect to server...Please try again.")
        }
      }
      loadTweets(callbackFunc)
    }, []);
    return(
      tweets.map((tweetItems, index) => {
        return <Tweet 
        tweet={tweetItems}
        className="my-5 py-5 border"
        key={`${index}-{tweetItems.id}`}
        />
      })
    )
  }

export const ActionBtn = (props) => {
    const {tweet, action} = props;
    const className = props.className ? props.className : "btn btn-primary btn-sm";
    var btnLike = <button className={className}> {tweet.likes} Like</button>
    return action.type === "like" ? btnLike : null
  }
  
export const Tweet = (props) => {
    const {tweet} = props;
    const className = props.className ? props.className : "col-10 mx-auto col-md-6";
    return <div className={className}>
      <p>{tweet.id} - {tweet.content}</p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{type: "like"}}/>
        <ActionBtn tweet={tweet} action={{type: "unlike"}}/>
      </div>
    </div>
  }