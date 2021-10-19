import React, { useEffect, useState } from 'react';
import { loadTweets } from '../Lookup';

export const TweetComp = (props) => {
  const textRef = React.createRef();
  const [newTweets, setNewTweets] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    const newVal = textRef.current.value;
    let tempTweet = [...newTweets];
    tempTweet.unshift({
      content: newVal,
      likes: 0,
      id: 545
    })
    setNewTweets(tempTweet);
    textRef.current.value = '';
  }
  return (
    <div className={props.className}>
      <div className="col mb-3">
        <form onSubmit={submitHandler}>
          <textarea ref={textRef} className="form-control" name="tweets" required={true}></textarea>
          <button className="btn btn-primary my-3" type="submit">Tweet</button>
        </form>
      </div>
      <TweetsList newTweets={newTweets} />
    </div>
  )
}

export const TweetsList = (props) => {
  const [tweets, setTweets] = useState([]);
  const [tweet2, setTweet2] = useState([]);
  // setTweets([...props.newTweets].concat(tweets));
  useEffect(() => {
    const final = [...props.newTweets].concat(tweets);
    if (final.length !== tweet2.length) {
      setTweet2(final);
    }
  }, [props.newTweets, tweets, tweet2]);

  useEffect(() => {
    const callbackFunc = (response, status) => {
      if (status === 200) {
        setTweets(response);
      }
      else {
        alert("Could not connect to server...Please try again.")
      }
    }
    loadTweets(callbackFunc)
  }, [tweets]);
  return (
    tweet2.map((tweetItems, index) => {
      return <Tweet
        tweet={tweetItems}
        className="my-5 py-5 border"
        key={`${index}-{tweetItems.id}`}
      />
    })
  )
}

export const ActionBtn = (props) => {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [liked, setLiked] = useState(tweet.liked === true ? true : false);
  const className = props.className ? props.className : "btn btn-primary btn-sm";
  const actionDisp = action.display ? action.display : "Action";
  const clickHandler = (e) => {
    e.preventDefault();
    if (action.type === "like") {
      if (liked === true) {
        setLikes(likes - 1)
        setLiked(false);
      }
      else {
        setLikes(likes + 1);
        setLiked(true);
      }
    }
  }
  const display = action.type === "like" ? `${likes} ${actionDisp}` : actionDisp
  var btnLike = <button className={className} onClick={clickHandler}>{display}</button>
  return btnLike
}

export const Tweet = (props) => {
  const { tweet } = props;
  const className = props.className ? props.className : "col-10 mx-auto col-md-6";
  return <div className={className}>
    <p>{tweet.id} - {tweet.content}</p>
    <div className="btn btn-group">
      <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
      <ActionBtn tweet={tweet} action={{ type: "unlike", display: "Unlike" }} />
      <ActionBtn tweet={tweet} action={{ type: "retweet", display: "Retweet" }} />
    </div>
  </div>
}