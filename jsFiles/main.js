
let city="Latakia";
 
   var weatherData;
   
   const kelvin = 273;

   const loader = document.querySelector("#loading");
   const button = document.querySelector("#button");

function test(value){
  city=value;
  
  document.getElementById('getCity').value='';
  hideMain();
  hideButton();
  dataRetriever();}  
  function dataRetriever() {
    displayLoading();
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var dayName = days[today.getDay()];
        let lon;
        let lat;
        var id;
        let listCounter=1;let idCounter;
        let todayIcon;
        let todaySummary;
        let high;
        let low;

  if (navigator.geolocation) {
   let main = document.getElementById("detailsOfDay");
            var child = main.lastElementChild;
          while(child){
            main.removeChild(child);
            child = main.lastElementChild;
          }
      navigator.geolocation.getCurrentPosition((position) => {
     
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      // API ID
      const api = "kkjumv4bojd51vw23xdrfosd07uq8thwih2d8twd";
  
      // API URL
      const base =
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lat=${lat}&` +
        `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
       
      // Calling the API
      
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          hideLoading();
          displayButton();
          
          idCounter=0;
          weatherData=data;
          console.log(data);
          let now = data.list[0].dt_txt.slice(8,11);
          let firstContent = data.list[0];
          while (listCounter){
            if(data.list[listCounter].dt_txt.slice(8,11)!= now && data.list[listCounter].dt > data.list[0].dt){
                listCounter = parseInt(listCounter/2);
                break;
            }
            listCounter++;
        }
        var today = data.list[listCounter];
          summary = today.weather[0].description;
          var iconCode =today.weather[0].icon;
            todayIcon = "http://openweathermap.org/img/w/"+iconCode+".png";
            document.getElementById('todayIcon').innerHTML = `<img class="mainIcon" src="${todayIcon}" /> <div class="paddingTop"> ${Math.floor(today.main.temp - kelvin)} °C </div> `
          document.getElementById('high').innerHTML = "High : " + Math.floor(today.main.temp_max - kelvin) + " °C";
          document.getElementById('low').innerHTML = "Low : " + Math.floor(today.main.temp_min - kelvin) + " °C";
          document.getElementById('wind').innerHTML ="Wind : "+ today.wind.speed + " m/s";
          document.getElementById('humidity').innerHTML ="Humidity : "+ today.main.humidity + " %";

          document.getElementById("today").innerHTML =new Date(firstContent.dt*1000-(data.city.timezone*1000)).toLocaleDateString("en-US", options);

          document.getElementById('head').textContent = data.city.name + " City / "+data.city.country; 
          var main = document.getElementById('main');
          var child = main.lastElementChild;
          while(child){
            main.removeChild(child);
            child = main.lastElementChild;
          }
          for (var i=1;i<6;i++){
            var currentItem = data.list[listCounter];
            var item = document.createElement("div");
            item.style.animationName = "presenting";
            item.style.animationDuration=`${i-0.3*i}s`;
            item.setAttribute('class','grid-item-main-animated');
            item.setAttribute('id',`${i}`);
            item.setAttribute('onclick',`details(document.getElementById(${i}),${i})`)
            main.appendChild(item);
            var day = document.createElement("div");
            day.textContent = days[new Date(currentItem.dt*1000-(data.city.timezone*1000)).getDay()];
            
            

            item.appendChild(day);
            var summary = document.createElement('div');
            summary.textContent = currentItem.weather[0].description;
            var icon = document.createElement('img');
            iconCode =currentItem.weather[0].icon;
            let icon1="http://openweathermap.org/img/w/"+iconCode+".png";
            icon.setAttribute('src',`${icon1}`);
            icon.setAttribute('class','icon');
            item.appendChild(icon);
            let temp = document.createElement('div');
            temp.textContent = Math.floor(currentItem.main.temp - kelvin) + " °C";
            item.appendChild(temp);
            let dayDate = document.createElement('div');
            dayDate.textContent= currentItem.dt_txt.slice(0,10);
            item.appendChild(summary);
            item.appendChild(dayDate);
            listCounter+=8;
            
          }
          
        });
    });
  }
  
  
}
  
window.addEventListener("load", dataRetriever);

function displayLoading() {
  var element = document.getElementById('loaderContainer');
  element.setAttribute('class','loaderContainer');
  loader.classList.add("display");
  
}
function hideLoading() {
  var element = document.getElementById('loaderContainer');
  element.removeAttribute('class');
  document.getElementById('body').setAttribute('class','main');
  loader.classList.remove("display");
}
function displayButton() {
  button.classList.add("display");
}
function hideButton() {
  button.classList.remove("display");
}
function displayMain(){
  body.classList.remove("hide");
}
function hideMain(){
  body.classList.add('hide');
}

function details(element,id){
  
  for(var j=1;j<6;j++){
    document.getElementById(j).setAttribute('class','grid-item-main');
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
          if(id===1){
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
          var j=1;
          
          for(var i=listId;i<nextList;i++,j++){
            let weather=weatherData.list[i];
            let item = document.createElement("div");
            item.setAttribute("class","grid-item");
            item.style.animationDuration=`${j-0.5 *j}s`;
            main.appendChild(item);
           
            let hour =document.createElement("div");
            if(parseInt(weather.dt_txt.slice(11,13))>12){
              hour.textContent = parseInt(weather.dt_txt.slice(11,16))-12 + ":00 PM";
            }
            else{
              
              hour.textContent = parseInt(weather.dt_txt.slice(11,16)) + ":00 AM" 
         
            }
            if((weather.dt_txt.slice(11,13)) === '00'){ hour.textContent = "12:00 PM" }
            
            item.appendChild(hour);
            let summary = document.createElement("div");
            summary.textContent = weather.weather[0].description;
            let icon =document.createElement("div");
            var iconCode =weather.weather[0].icon;
            let icon1 = "http://openweathermap.org/img/w/"+iconCode+".png";
            icon.innerHTML = `<img src="${icon1}" />`;
            item.appendChild(icon);
            let temp = document.createElement("div");
            temp.textContent = Math.floor(weather.main.temp - kelvin) + " °C";
            item.appendChild(temp);
            item.appendChild(summary);
          }
          element.setAttribute('class','grid-item-active');
        };

        setInterval(function(){
          window.location.reload();
        }, 300000);
             function checkTime (i){
                if(i<10) {i="0"+i};
                return i;
              }
               
/* new Date(data.city.sunset*1000-(data.city.timezone*1000)).getHours(); */
