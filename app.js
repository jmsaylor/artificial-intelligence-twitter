const Twitter = require("twitter-lite");

const { twitterKey, twitterSecret } = require("./config.json");

const user = new Twitter({
  consumer_key: twitterKey,
  consumer_secret: twitterSecret,
});

(async function () {
  try {
    const response = await user.getBearerToken();
    console.log(response.access_token);

    const app = new Twitter({
      bearer_token: response.access_token,
    });
  } catch (error) {
    console.error(error);
  }
})();
