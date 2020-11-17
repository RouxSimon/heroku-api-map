const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = process.env.API_KEY || 'NC';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  console.log("URL: "+url)
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
})

function initMap() {
  var lyon = {
    lat: 45.344,
    lng: 4.036
  };
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: lyon
    });
  var marker = new google.maps.Marker({
    position: lyon,
    map: map
  });
}

app.get('/', function (req, res) {
res.render('index');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Example app listening on port 3000!')
})
