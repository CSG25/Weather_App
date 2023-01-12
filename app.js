//Script for Weahter_App
// Date(dt * 1000).toString().slice()

let weather = {
  apiKey: "fef3f3dd812cac11403831243e565534",

  fetchWeather: function(city) {
    fetch (
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
    .then((response) => { 
      if (!response.ok) {
        alert("No Weather found!");
        throw new Error("No Weather found.");
      }
      else {
        return response.json();
      }})
    .then((data) => this.displayWeather(data))
  },

  displayWeather: function (data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, temp_min, temp_max} = data.main;
    
    latLon( name);
  
    const {dt} = data  ;
    const {timezone} = data;
    const dateTime = new Date (dt * 1000);
    const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset () * 60000;
    const currentLocalTime = toUtc + 1000 * timezone;
    const selectedDate =  new Date(currentLocalTime);

    const date = selectedDate.toLocaleString('en-GB', {
      weekday: "long",
    });
    const hours = selectedDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const time = `${hours}`
    const times = new Date();
    const day = times.getDay();

    // console.log(name, icon, temp, description[0].toUpperCase() + description.slice(1) , temp_min, temp_max, time, date);
    document.querySelector(".city").innerText= name;
    document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + "@2x.png"
    document.querySelector(".current-temp").innerText= Math.round(temp) + '°';
    document.querySelector(".min-temp").innerText= Math.round(temp_min) + '°';
    document.querySelector(".max-temp").innerText= Math.round(temp_max) + '°';
    document.querySelector(".description").innerText = description[0].toUpperCase() + description.slice(1);
    document.querySelector(".time").innerText = time;
    document.querySelector(".date").innerText = date;
    document.body.style.backgroundImage = "url('https://source.unsplash.com/2800x2000/?" + name + "')"

   

  },



  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
  if(event.key == 'Enter') {
    weather.search();
  } 
});

document.querySelector('.search-button').addEventListener('click', function () {
  weather.search();
});

weather.fetchWeather("Cluj-Napoca");



const apiKey = "fef3f3dd812cac11403831243e565534";
async function latLon(city) {
  const latLong1 = axios.get("https://api.openweathermap.org/data/2.5/weather?q="
  + city
  +'&units=metric&appid='
  + apiKey)
  const latLong = await latLong1;
  const {lat,lon} = latLong.data.coord;

  fetch ('https://api.openweathermap.org/data/2.5/forecast?id=524901&appid='
  + apiKey 
  +'&lat=' + lat 
  + '&lon=' + lon 
  + '&units=metric')
  .then((response) => response.json())
  .then((data) =>  this.displayNextDays(data))
  // this.displayNextDays(data)

 
};


   function displayNextDays (data)  {
    function date(number) {

      const {dt} = data.list[number]  ;
      const {timezone} = data.city;
      const dateTime = new Date (dt * 1000);
      const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset () * 60000;
      const currentLocalTime = toUtc + 1000 * timezone;
      const selectedDate =  new Date(currentLocalTime);
    
      const date = selectedDate.toLocaleString('en-GB', {
        weekday: "short",
      });
      const hours = selectedDate.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      const time = `${hours}`;
      const times = new Date();
      const day = times.getDay();
      const res=  (date);
      return(res);
    };
    
    document.querySelector('.temp1').innerText= Math.round(data.list[7].main.temp) + "°C";
    document.querySelector('.temp2').innerText= Math.round(data.list[14].main.temp) + "°C";
    document.querySelector('.temp3').innerText= Math.round(data.list[22].main.temp) + "°C";
    document.querySelector('.temp4').innerText= Math.round(data.list[30].main.temp) + "°C";
    document.querySelector('.temp5').innerText= Math.round(data.list[38].main.temp) + "°C";
    document.querySelector('.icon1').src= "https://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + ".png";
    document.querySelector('.icon2').src= "https://openweathermap.org/img/wn/" + data.list[14].weather[0].icon + ".png";
    document.querySelector('.icon3').src= "https://openweathermap.org/img/wn/" + data.list[22].weather[0].icon + ".png";
    document.querySelector('.icon4').src= "https://openweathermap.org/img/wn/" + data.list[30].weather[0].icon + ".png";
    document.querySelector('.icon5').src= "https://openweathermap.org/img/wn/" + data.list[38].weather[0].icon + ".png";
    document.querySelector('.day1').innerHTML=  date(7);
    document.querySelector('.day2').innerText=  date(15);
    document.querySelector('.day3').innerText=  date(22);
    document.querySelector('.day4').innerText=  date(30);
    document.querySelector('.day5').innerText=  date(38);

    
   
  }; 


  
 

