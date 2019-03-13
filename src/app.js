const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const pubDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const name = 'LukeGibran';
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath);
app.use(express.static(pubDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an Address'
    });
  }

  geocode(req.query.address, (error, { center, place_name } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(center[0], center[1], (error, respond) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: respond,
        location: place_name,
        address: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error 404',
    name,
    message: 'Help articles not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error 404',
    name,
    message: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
