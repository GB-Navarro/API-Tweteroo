import express from "express";
import cors from "cors";

const app = express();

let user = {};
let tweetsArray = [];

app.use(express.json());
app.use(cors());

app.post("/sign-up", (request, response) => {
  const username = request.body.username;
  const avatar = request.body.avatar;
  if (
    validateUsername(username) === false ||
    validateUserAvatar(avatar) === false
  ) {
    response.sendStatus(400);
  }
  user = request.body;
  response.send("Ok!");
});

app.post("/tweets", (request, response) => {
  createNewTweet(request.body.tweet);
  response.send("Ok!");
});

app.get("/tweets", (request, response) => {
  if (tweetsArray.length > 10) {
    let lastTweets = getLastTweets(tweetsArray);
    let ordenedTweets = sortTweets(lastTweets);
    response.send(ordenedTweets);
  } else {
    let ordenedTweets = sortTweets(tweetsArray);
    response.send(ordenedTweets);
  }
});

function getLastTweets(tweetsArray) {
  let lastTweets = [];
  let aux = 0;

  for (let i = tweetsArray.length - 10; aux != 10; i++) {
    lastTweets.push(tweetsArray[i]);
    aux += 1;
  }

  return lastTweets;
}

function sortTweets(tweetsArray) {
  let ordenedTweets = [];
  for (let i = tweetsArray.length - 1; i >= 0; i--) {
    ordenedTweets.push(tweetsArray[i]);
  }
  return ordenedTweets;
}

function validateUsername(username) {
  let itsValid = false;
  if (username.length === 0) {
    return itsValid;
  } else {
    itsValid = true;
    return itsValid;
  }
}

function createNewTweet(text) {
  let tweet = {
    username: "",
    avatar: "",
    tweet: "",
  };
  tweet.username = user.username;
  tweet.avatar = user.avatar;
  tweet.tweet = text;
  tweetsArray.push(tweet);
}

function validateUserAvatar(avatar) {
  let itsValid = false;
  if (avatar.length === 0) {
    return itsValid;
  } else {
    for (let i = 0; i < avatar.length; i++) {
      if (avatar[i] === ".") {
        let type = avatar[i + 1] + avatar[i + 2] + avatar[i + 3];
        if (type === "jpg" || type === "png" || type === "gif") {
          itsValid = true;
          return itsValid;
        } else if (type + avatar[i + 4] === "jpeg") {
          itsValid = true;
          return itsValid;
        }
      }
    }
    return itsValid;
  }
}

app.listen(5000);
