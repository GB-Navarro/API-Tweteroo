import express from "express";
import cors from "cors";

const app = express();

let user = {}
let tweetsArray = []

app.use(express.json());
app.use(cors());

app.post("/sign-up", (request, response) => {
    user = request.body;
    console.log(user);
    response.send("Ok!");
});
app.post("/tweets", (request, response) => {
    tweetsArray.push(request.body);
    console.log(tweetsArray);
    response.send("Ok!");
})
app.get("/tweets", (request, response) => {
    if(tweetsArray.length > 10){
        let lastTweets = []
        let aux = 0;
        for(let i = (tweetsArray.length - 11); aux != 10; i++){
            lastTweets.push(tweetsArray[i]);
            aux += 1;
        }
        response.send(lastTweets);
    }else{
        response.send(tweetsArray);
    }
});

app.listen(5000);