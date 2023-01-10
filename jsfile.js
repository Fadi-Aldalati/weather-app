       function checkTime (i){
          if(i<10) {i="0"+i};
          return i;
        }
        function startTime(){
          const today = new Date();
          let h = today.getHours();
          let m = today.getMinutes();
          let s = today.getSeconds();
          m= checkTime(m);
          s = checkTime(s);
          let ap = h >= 12 ? 'pm' : 'am';
          document.getElementById("date").innerHTML = h +":"+m + ':' +s + " "+ap;
          setTimeout(startTime, 1000);
        }
      
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    
            var dayName = days[today.getDay()];
             document.getElementById("today").innerHTML = today.toLocaleDateString("en-US", options);
             document.getElementById("date").innerHTML

             let lon;
        let lat;
        var k=1;var id;
        let listCounter=0;
const kelvin = 273;
var temperature ;let summary;let loc ;let icon;let day;let dayDate;
let todayIcon;let todaySummary;let high;let low;

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
          id=0;
          let first = data.list[0];
            summary = first.weather[0].description;
            todayIcon = `./icons1/${summary}.png`;
            document.getElementById('todayIcon').innerHTML = `<img src="${todayIcon}" /> <div class="paddingTop"> ${Math.floor(first.main.temp - kelvin)} °C </div> `
          document.getElementById('high').innerHTML = "High : " + Math.floor(first.main.temp_max - kelvin) + " °C";
          document.getElementById('low').innerHTML = "Low : " + Math.floor(first.main.temp_min - kelvin) + " °C";
          document.getElementById('wind').innerHTML ="Wind : "+ first.wind.speed + " m/s";
          document.getElementById('humidity').innerHTML ="Humidity : "+ first.main.humidity + " %";


            console.log(data);

            for (var i=0;i<5;i++){
              temperature = document.getElementsByClassName("temp")[i];
              summary = document.getElementsByClassName("summary")[i];
              loc = document.getElementsByClassName("day")[i];
              icon = document.getElementsByClassName("icon")[i];
              dayDate = document.getElementsByClassName("dayDate")[i];
              details = document.getElementsByClassName("details")[i];


              day =days[new Date(data.list[listCounter].dt*1000-(data.city.timezone*1000)).getDay()];
           //   console.log(new Date(data.city.sunset*1000-(data.city.timezone*1000)).getHours());
                temperature.textContent = 
                    Math.floor(data.list[listCounter].main.temp - kelvin) + "°C";
                summary.textContent = data.list[listCounter].weather[0].description;
                loc.textContent = day ; /*data.city.name + "," + data.city.country;*/
                dayDate.textContent= data.list[listCounter].dt_txt.slice(0,10);
                let icon1 = `./icons1/${summary.textContent}.png`;
                details.id = listCounter;
              console.log(details.id);
                icon.innerHTML = 
                    `<img src="${icon1}" />`;
                   if(k<0)  {listCounter +=8 ;
                     
                  }
                       
                   
                    while(k>0){
                        if(parseInt(data.list[k].dt_txt[9])+(parseInt(data.list[k].dt_txt[8])*10) > now){
                            listCounter = k+4;
                            k=-3;

                        }
                        k++;

                    }
                }
                
        });
    });
  }
});
function test(element){
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
          console.log(data);
          
        });
    });
  }
});
console.log(element);
}
/*for (var i=0;i<5;i++){
temperature = document.getElementsByClassName("temp")[i];}*/




/*
var x ="";
x = <
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
*/