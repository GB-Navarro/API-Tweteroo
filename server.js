import express from "express";
import cors from "cors";

const app = express();

let user = {}
let tweetsArray = []

app.use(express.json());
app.use(cors());

app.post("/sign-up", (request, response) => {
    user = request.body;
    response.send("Ok!");
});
app.post("/tweets", (request, response) => {
    let tweet = {
        username: "",
        avatar: "",
        tweet: ""
    }
    tweet.username = user.username;
    tweet.avatar = user.avatar
    tweet.tweet = request.body.tweet
    tweetsArray.push(tweet);

    response.send("Ok!");
})
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

    for (let i = (tweetsArray.length - 10); aux != 10; i++) {
        lastTweets.push(tweetsArray[i]);
        aux += 1;
    }

    return lastTweets;
}

function sortTweets(tweetsArray) {
    let ordenedTweets = [];
    for (let i = (tweetsArray.length - 1); i >= 0; i--) {
        ordenedTweets.push(tweetsArray[i]);
    }
    return ordenedTweets;
}

app.listen(5000);