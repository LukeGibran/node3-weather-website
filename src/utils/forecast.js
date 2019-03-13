const req = require('request');

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/2e26aeabb89e90bfdded2dcb95e8a688/${lat},${lng}?`;

  req({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the forecast server');
    } else if (body.error) {
      callback('Unable to find the location provided');
    } else {
      const temp = body.currently.temperature;
      const precipProb = body.currently.precipProbability;
      const summary = body.daily.data[0].summary;
      const response = `${summary}It is currently ${temp} degrees out. There is ${precipProb}% chance of rain.`;

      callback(undefined, response);
    }
  });
};

module.exports = forecast;
