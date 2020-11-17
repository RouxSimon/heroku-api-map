const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = process.env.API_KEY || 'NC';
const apiKeyTomTom = process.env.TOMTOM || 'NC';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let urlTomTom = `http://api.tomtom.com/map/1/staticimage?key=${apiKeyTomTom}&zoom=6&center=4.563,44.11&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified&language=fr-FR`
  
  console.log("URL: "+url)
  console.log("URL: "+urlTomTom)
  request(url, function (err, response, body) {
    console.log("Status "+response.statusCode);

    if(response.statusCode == 401){
      res.render('index', {weather: null, error: 'Invalid API token'});
    }else if(response.statusCode == 404){
      res.render('index', {weather: null, error: 'City not found'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
  
  request(urlTomTom, function (err, response, body) {
    console.log("Status "+response.statusCode);

    if(response.statusCode == 401){
      res.render('index', {staticimage: null, error: 'Invalid API token'});
    } else if(response.statusCode == 404){
      res.render('index', {staticimage: null, error: 'Map not found'});
    } else {
      let staticimage = JSON.parse(body)

      if(staticimage.main == undefined){
        res.render('index', {staticimage: null, error: 'Error, please try again'});
      } else {
        let staticimageDisplay = ${staticimage};
        res.render('index', {staticimage: staticimageDisplay, error: null});
      }
    }

  });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Example app listening on port 3000!')
})
