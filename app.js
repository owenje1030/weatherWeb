
//html element
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const locat = document.querySelector(".location p");
const notification = document.querySelector(".notification");

// Api data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// degree Celsius convertion
const convertion = 273;
// API KEY
const api_key = "42570c304b4b0d5dee15097f5cdec509";

// check geolocation
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
}else{
    notification.style.display = "block";
    notification.innerHTML = "<p>Browser does not Support Geolocation</p>";
}

//get user location
function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}



// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    
    fetch(api)
        .then((response)=>response.json())
        .then((json)=>{
            weather.temperature.value = Math.floor(json.main.temp - convertion);
            weather.description = json.weather[0].description;
            weather.iconId = json.weather[0].icon;
            weather.city = json.name;
            weather.country = json.sys.country;
        })
        .then(()=>{
            displayWeather();
        }).catch((error)=>{
            console.error(error);
        });
}

// display weather to ui
function displayWeather(){
    icon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    desc.innerHTML = weather.description;
    locat.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// change of c to f onClick
temp.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        temp.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

