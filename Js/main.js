var activeLink = document.querySelectorAll('.nav-link');
for (var i = 0; i < activeLink.length; i++) {
    activeLink[i].addEventListener('click', function () {
        for (var j = 0; j < activeLink.length; j++) {
            activeLink[j].classList.remove('active');
        }
        this.classList.toggle('active');
    });
}
let apiResponse;
let tempState;
let temerature;
let country;
let firstDay;
let dayString;
let dayNum;
let month;
let copyOfRespose;
let tempIcon;
let firtRain;
let firstWindSpeed;
let firstWindDirection;
// // // // // // // // //
let secondDay;
let secondDayString;
let secondDayMonth;
let secondDayNum;
let secondTempState;
let secondMaxTemp;
let secondMinTemp;
let secondTempIcon;
// // // // // // // // //
let thirdDay;
let thirdDayString;
let thirdDayMonth;
let thirdDayNum;
let thirdTempState;
let thirdMaxTemp;
let thirdMinTemp;
let thirdTempIcon;
let temperatureContainer = document.querySelector('#tempaturecards');
let countrySearch=document.querySelector('#countrysearch');
let searchState;
let errorSearchMessage=document.querySelector('.error-for-search');
async function loadWeather(){
    function getApi() {
        let cairoApi = new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            if(searchState&&countrySearch.value!=""){
                req.open("get",`https://api.weatherapi.com/v1/forecast.json?key=d98adf9a79714ad192b185640250907&q=${countrySearch.value}&days=3`);
            }
            else{
                req.open("get",`https://api.weatherapi.com/v1/forecast.json?key=d98adf9a79714ad192b185640250907&q=egypt&days=3`);
            }
            req.send();
            req.addEventListener("loadend", function () {
                if (req.status >= 200 && req.status <= 300) {
                    apiResponse = JSON.parse(req.response);
                    copyOfRespose = apiResponse;
                    resolve(apiResponse);
                }
                else {
                    reject();
                }
            });
        });
        return cairoApi;
    }
    function getFirstDayValues() {
        tempState = copyOfRespose.current.condition.text;
        temerature = copyOfRespose.current.temp_c;
        country = copyOfRespose.location.name;
        firstDay = copyOfRespose.current.last_updated;
        tempIcon=copyOfRespose.current.condition.icon;
        dayString = new Date(firstDay).toLocaleDateString("en-US", { weekday: "long" });
        dayNum = new Date(firstDay).getDate();
        month = new Date(firstDay).toLocaleDateString("en-US", { month: "long" });
        firstWindSpeed=copyOfRespose.current.wind_kph;
        firstWindDirection=copyOfRespose.current.wind_dir;
        firtRain=copyOfRespose.forecast.forecastday["0"].day.daily_will_it_rain;
    }
    function getSecondDatValues(){
        secondMaxTemp=copyOfRespose.forecast.forecastday["1"].day.maxtemp_c;
        secondMinTemp=copyOfRespose.forecast.forecastday["1"].day.mintemp_c;
        secondTempState=copyOfRespose.forecast.forecastday["1"].day.condition.text;
        secondTempIcon=copyOfRespose.forecast.forecastday["1"].day.condition.icon;
        secondDay=copyOfRespose.forecast.forecastday["1"].date;
        secondDayNum=new Date(secondDay).getDate();
        secondDayString=new Date(secondDay).toLocaleDateString("en-US", { weekday: "long" });
        secondDayMonth=new Date(secondDay).toLocaleDateString("en-US", { month: "long" });
    }
    function getThirdDatValues(){
        thirdMaxTemp=copyOfRespose.forecast.forecastday["2"].day.maxtemp_c;
        thirdMinTemp=copyOfRespose.forecast.forecastday["2"].day.mintemp_c;
        thirdTempState=copyOfRespose.forecast.forecastday["2"].day.condition.text;
        thirdTempIcon=copyOfRespose.forecast.forecastday["2"].day.condition.icon;
        thirdDay=copyOfRespose.forecast.forecastday["2"].date;
        thirdDayNum=new Date(thirdDay).getDate();
        thirdDayString=new Date(thirdDay).toLocaleDateString("en-US", { weekday: "long" });
        thirdDayMonth=new Date(thirdDay).toLocaleDateString("en-US", { month: "long" });
    }
    async function render(){
        temperatureContainer.innerHTML = `<div class="col-lg-4 d-flex">
        <div class="card border-0 rounded-3  w-100" >
        <header class="card-header border-0 d-flex justify-content-between">
        <span>${dayString}</span>
        <span>${dayNum+month}</span>
        </header>
        <div class="card-body border-0">
        <div class="card-country">
        <p>${country}</p>
        </div>
        <div class="card-temperature">
        <span>${temerature}&deg;</span>
        <span>C</span>
        </div>
        <div class="temperature-logo">
        <img class="w-25" src="https:${tempIcon}" alt="">
        </div>
        <div class="temperature-state">
        <p>${tempState}</p>
        </div>
        <div class="temperature-state-icons">
        <img src="./imgs/icon-umberella.png" alt="umbrella-icon">
        <span class="me-4">${firtRain} %</span>
        <img src="./imgs/icon-wind.png" alt="wind-icon">
        <span class="me-4">${firstWindSpeed} km/h</span>
        <img src="./imgs/icon-compass.png" alt="Compass-icon">
        <span>${firstWindDirection}</span>
        </div>
        </div>
        </div>
        </div>
        
        
        <div class="col-lg-4 d-flex">
        <div class="card border-0 rounded-3 card-2  w-100" >
        <header class="card-header text-center">
        <span >${secondDayString}</span>
        </header>
        <div class="card-body d-flex flex-column align-items-center">
        <div class="temperature-logo my-3">
        <img class="w-100" src="https:${secondTempIcon}" alt="">
        </div>
        <div class="card-temperature-c2">
        <span>${secondMaxTemp}&deg;</span>
        <span>C</span>
        </div>
        <div class="card-temperature-night-c2">
        <span>${secondMinTemp}&deg;</span>
        </div>
        <div class="temperature-state-2 my-3 ">
        <p>${secondTempState}</p>
        </div>
        
        </div>
        </div>
        </div>
        
        <div class="col-lg-4 d-flex ">
        <div class="card border-0 rounded-3 card-3  w-100" >
        <header class="card-header text-center">
        <span >${thirdDayString}</span>
        </header>
        <div class="card-body d-flex flex-column align-items-center">
        <div class="temperature-logo my-3">
        <img class="w-100" src="https:${thirdTempIcon}" alt="">
        </div>
        <div class="card-temperature-c2">
        <span>${thirdMaxTemp}&deg;</span>
        <span>C</span>
        </div>
        <div class="card-temperature-night-c2">
        <span>${thirdMinTemp}&deg;</span>
        </div>
        <div class="temperature-state-2 my-3">
        <p>${thirdTempState}</p>
        </div>
        
        </div>
        </div>
        </div>
        `;
    }
    try{
        await getApi();
        getFirstDayValues();
        getSecondDatValues();
        getThirdDatValues();
        await render();
        console.log(copyOfRespose);
    }
    catch{
        countrySearch.value="egypt";
        await loadWeather();
    };
}
loadWeather();
countrySearch.addEventListener('input', function(e){
    searchState=e.isTrusted;
    loadWeather();
});
