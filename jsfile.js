var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();  
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var date = new Date();
                    var dayName = days[d.getDay()];
             document.getElementById("day").innerHTML = dayName;
             document.getElementById("date").innerHTML = date; 

             let lon;
        let lat;
    
const kelvin = 273;
  
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      // API ID
      const api = "kkjumv4bojd51vw23xdrfosd07uq8thwih2d8twd";
  
      // API URL
      const base =
        `http://api.openweathermap.org/data/2.5/forecast?q=Latakia,Syria&lat=${lat}&` +
        `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
       
      // Calling the API
      
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            for(let i=0;i<3;i++){ 
                console.log(data.list[3].dt_txt[9]);
                temperature.textContent = 
                    Math.floor(data.list[3].main.temp - kelvin) + "°C";
                summary.textContent = data.list[3].weather[0].description;
                loc.textContent = data.city.name + "," + data.city.country;
                let icon1 = './weather_icons/set01/big/27.png';
                icon.innerHTML = 
                    `<img src="${icon1}" />`;

            }   
        });
    });
  }
});
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
/*
var x ="";
x = <
*/