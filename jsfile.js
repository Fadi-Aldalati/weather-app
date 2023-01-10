        const dataTime = (date)=>{
          let hours = date.getHours();
        let minutes = date.getMinutes();
        let ap = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let mergeTime = hours + ':' + minutes + ' ' + ap;
        return mergeTime;
        }
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    
            var dayName = days[today.getDay()];
             document.getElementById("day").innerHTML = today.toLocaleDateString("en-US", options);
             document.getElementById("date").innerHTML = dataTime(today);

             let lon;
        let lat;
        var k=1;
        let u=0;
const kelvin = 273;
var temperature ;let summary;let loc ;let icon;let day;


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
        `lon=${lon}&exclude={hourly}&appid=6d055e39ee237af35ca066f35474e9df`;
       
      // Calling the API
      
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            let now =  parseInt(data.list[0].dt_txt[9])+(parseInt(data.list[0].dt_txt[8])*10);
            
            console.log(data);
            for (var i=0;i<5;i++){
              temperature = document.getElementsByClassName("temp")[i];
              summary = document.getElementsByClassName("summary")[i];
              loc = document.getElementsByClassName("location")[i];
              icon = document.getElementsByClassName("icon")[i];
              day =days[new Date(data.list[u].dt*1000-(data.city.timezone*1000)).getDay()];
                
                temperature.textContent = 
                    Math.floor(data.list[u].main.temp - kelvin) + "°C";
                summary.textContent = data.list[u].weather[0].description;
                loc.textContent = day ;/*data.city.name + "," + data.city.country;*/
                
                let icon1 = `./icons/${summary.textContent}.png`;
                icon.innerHTML = 
                    `<img src="${icon1}" />`;
                   if(k<0)  u +=8 ;
                       
                   
                    while(k>0){
                        if(parseInt(data.list[k].dt_txt[9])+(parseInt(data.list[k].dt_txt[8])*10) > now){
                            u = k;
                            k=-3;

                        }
                        k++;

                    }
                }
        });
    });
  }
});


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