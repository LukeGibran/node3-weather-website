const req = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibHVrZWdpYnJhbiIsImEiOiJjanN6ZWhnMjkwOWUwM3l0aDJ6a2FuenJ0In0.qgs4Y0l4AjEQo6PtjmaHXg`;

  req({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the server', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find the location', undefined);
    } else {
      callback(undefined, body.features[0]);
    }
  });
};

module.exports = geocode;
