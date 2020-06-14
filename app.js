const Twitter = require("twitter-lite");

const { twitterKey, twitterSecret } = require("./config.json");

const user = new Twitter({
  consumer_key: twitterKey,
  consumer_secret: twitterSecret,
});

(async function () {
  try {
    const auth = await user.getBearerToken();
    // console.log(response.access_token);

    const app = new Twitter({
      bearer_token: auth.access_token,
    });

    const tweets = await app.get("/search/tweets", {
      q: "diamonds",
      lang: "en",
      count: 100,
    });

    //what's the diff between in and of in for conditions?
    for (tweet of tweets.statuses) {
      console.dir(tweet.text);
    }
  } catch (error) {
    console.error(error);
  }
})();
