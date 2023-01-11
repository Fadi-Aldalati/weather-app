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
          if(h > 12) h=h-12;
          document.getElementById("date").innerHTML = h +":"+m + ':' +s + " "+ap;
          setTimeout(startTime, 1000);
        }
      var weatherData;
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    
            var dayName = days[today.getDay()];
             document.getElementById("today").innerHTML = today.toLocaleDateString("en-US", options);
             document.getElementById("date").innerHTML

             let lon;
        let lat;
        var k=1;var id;
        let listCounter=0;let idCounter;
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
          idCounter=0;
          weatherData=data;
          
          let now = parseInt(data.list[0].dt_txt[9])+(parseInt(data.list[0].dt_txt[8])*10);
          let first = data.list[0];

          document.getElementById('head').textContent = data.city.name + " City / "+data.city.country; 

            summary = first.weather[0].description;
            todayIcon = `./icons/${summary}.png`;
            document.getElementById('todayIcon').innerHTML = `<img src="${todayIcon}" /> <div class="paddingTop"> ${Math.floor(first.main.temp - kelvin)} °C </div> `
          document.getElementById('high').innerHTML = "High : " + Math.floor(first.main.temp_max - kelvin) + " °C";
          document.getElementById('low').innerHTML = "Low : " + Math.floor(first.main.temp_min - kelvin) + " °C";
          document.getElementById('wind').innerHTML ="Wind : "+ first.wind.speed + " m/s";
          document.getElementById('humidity').innerHTML ="Humidity : "+ first.main.humidity + " %";


            console.log(data);

            for (var i=0;i<5;i++){
              temperature = document.getElementsByClassName("temp")[i];
              summary = document.getElementsByClassName("summary")[i];
              dayOf = document.getElementsByClassName("day")[i];
              icon = document.getElementsByClassName("icon")[i];
              dayDate = document.getElementsByClassName("dayDate")[i];
             
              


              day =days[new Date(data.list[listCounter].dt*1000-(data.city.timezone*1000)).getDay()];

           
                temperature.textContent = 
                    Math.floor(data.list[listCounter].main.temp - kelvin) + " °C";
                summary.textContent = data.list[listCounter].weather[0].description;
                dayOf.textContent = day ; 
                dayDate.textContent= data.list[listCounter].dt_txt.slice(0,10);
                let icon1 = `./icons/${summary.textContent}.png`;
               
                icon.innerHTML = `<img src="${icon1}" />`;
                   if(k<0)  {listCounter +=8 ;
                     idCounter+=8;
                  }
                       
                   
                    while(k>0){
                        if(parseInt(data.list[k].dt_txt[9])+(parseInt(data.list[k].dt_txt[8])*10) != now && data.list[k].dt > data.list[0].dt){
                            listCounter = k+4;
                            idCounter = k;
                            k=-3; }
                        k++;

                    }
                }
                
        });
    });
  }
});

function details(element,id){
  for(var j=1;j<6;j++){
    document.getElementById(j).setAttribute('class','grid-item');
  }
   k=1;
   var listId=0;var nextList=0;
   let now = parseInt(weatherData.list[0].dt_txt[9])+(parseInt(weatherData.list[0].dt_txt[8])*10);
            while(k>0){
              if(parseInt(weatherData.list[k].dt_txt[9])+(parseInt(weatherData.list[k].dt_txt[8])*10) != now && weatherData.list[k].dt > weatherData.list[0].dt){
                
                break;
                  
                 }
              k++;

              }
          if(id==='1'){
            listId=0;
            nextList=k;
          }
          else{
            listId=k+(id-2)*8;
            nextList=listId+8;
          }
          let main = document.getElementById("detailsOfDay");
            var child = main.lastElementChild;
          while(child){
            main.removeChild(child);
            child = main.lastElementChild;
          }
          
          
          for(var i=listId;i<nextList;i++){
            let weather=weatherData.list[i];
            let item = document.createElement("div");
            item.setAttribute("class","grid-item");
            main.appendChild(item);
           
            let hour =document.createElement("div");
            if(parseInt(weather.dt_txt.slice(11,13))>12){
              hour.textContent = parseInt(weather.dt_txt.slice(11,16))-12 + ":00 PM";
            }
            else{
              hour.textContent = parseInt(weather.dt_txt.slice(11,16)) + ":00 AM" 
         
            }
            
            item.appendChild(hour);
            let summary = document.createElement("div");
            summary.textContent = weather.weather[0].description;
            let icon =document.createElement("div");
            let icon1 = `./icons/${summary.textContent}.png`;
            icon.innerHTML = `<img src="${icon1}" />`;
            item.appendChild(icon);
            let temp = document.createElement("div");
            temp.textContent = Math.floor(weather.main.temp - kelvin) + " °C";
            item.appendChild(temp);
            item.appendChild(summary);
          }
          element.setAttribute('class','grid-item-active');

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
/*
  


window.addEventListener("click", () => {
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
          
          let now = parseInt(data.list[0].dt_txt[9])+(parseInt(data.list[0].dt_txt[8])*10);
          console.log(data);
          if(element===1){
            listId=0;
          }
          else{
            while(k>0){
              if(parseInt(data.list[k].dt_txt[9])+(parseInt(data.list[k].dt_txt[8])*10) != now && data.list[k].dt > data.list[0].dt){
                  listId = k*((element-1)*8);
                  k=-3; }
              k++;

          }

          }
          console.log(listId);
        });
    });
  }
});*/