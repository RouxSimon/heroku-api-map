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
  // let city = req.body.city;
  // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  // console.log("URL: "+url)
  // request(url, function (err, response, body) {
  //   console.log("Status "+response.statusCode);

  //   if(response.statusCode == 401){
  //     res.render('index', {weather: null, error: 'Invalid API token'});
  //   }else if(response.statusCode == 404){
  //     res.render('index', {weather: null, error: 'City not found'});
  //   } else {
  //     let weather = JSON.parse(body)
  //     if(weather.main == undefined){
  //       res.render('index', {weather: null, error: 'Error, please try again'});
  //     } else {
  //       let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
  //       res.render('index', {weather: weatherText, error: null});
  //     }
  //   }
  // });
  let getCoordinates = (lat,lon,callback) => { 
    request ({ 
      url: ​`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, 
      json: true
    },
    (error,response,body)=>{
      if(!error && response.statusCode === 200) 
      { 
        callback(undefined,{ 
          Temp: body.main.temp 
        });
      } 
      else {
        callback('unable to fetch weather'); 
      } 
    }); 
  };
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Example app listening on port 3000!')
})
