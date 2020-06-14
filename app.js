const Twitter = require("twitter-lite");
const language = require("@google-cloud/language");
const languageClient = new language.LanguageServiceClient();

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
      count: 1,
    });

    //what's the diff between in and of in for conditions?
    for (tweet of tweets.statuses) {
      console.log(tweet.text);
      console.log(await getSentiment(tweet.text));
    }
  } catch (error) {
    console.error(error);
  }
})();

async function getSentiment(text) {
  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };
  const [result] = await languageClient.analyzeSentiment({
    document: document,
  });
  const sentiment = result.documentSentiment;

  return sentiment.score;
}
