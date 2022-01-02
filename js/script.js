let API_KEY = "cc128a90e8254895b95c7a8fb4344bf6";
let userInput = document.getElementById("getWeather");
let userSubmit = document.getElementById("userSubmit");
let date = document.getElementById("date");
let cityTemp = document.getElementById("temp");
let cityWind = document.getElementById("wind");
let cityInfo = document.getElementById("description");
let cityHumudity = document.getElementById("humidity");
let weatherIcon = document.getElementById("icon");
let fiveForecast = document.getElementById("five_forecast");
let errorNotice = document.getElementById("errorNotice");
let divFiveForecast = document.getElementById("five_forecast");
let divRes_container = document.getElementById("res_container")
let cityName = document.getElementById("city_name")

var animateProgress = anime({
    targets: 'progress',
    value: 100,
    easing: 'linear',
    autoplay: false
});


document.querySelector('#userSubmit').onclick = animateProgress.restart;

userSubmit.addEventListener("click", function () {
    document.getElementById("loading").style.display = "block"

    if (userInput.value === "") {
        document.getElementById("loading").style.display = "none"
        document.getElementById("res_container").style.display = "none"
    }
});

$("#getWeather").keypress(function (event) {
    if (event.keyCode === 13) {
        $("#userSubmit").click();
    }
});

userSubmit.addEventListener("click", function (event) {
    let city = userInput.value;
    let urlToday = `https://api.weatherbit.io/v2.0/current?key=cc128a90e8254895b95c7a8fb4344bf6&lang=sv&units=m&city=${city}&country=`;
    let urlForeCast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=sv&country=&key=${API_KEY}`;

    event.preventDefault();
    city = userInput.value;
    userSubmit = userInput;

    if (userInput.value === "") {
        clearSecondDiv();
        errorNotice.innerText = "Aja baja.. Nu glömde du skriva en stad!";
        document.getElementById("errorNotice").style.marginTop = "150px"

    } else {
        clearError();

        fetch(urlToday)
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw "Server error";
                }
            })
            .then(function (data) {
                cityTemp.innerText = data.data[0].temp + " " + "\xB0" + "C";
                let icon = data.data[0].weather.icon;
                weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                cityWind.innerText =
                    "Vind m/s (byvind) :" + " " + data.data[0].wind_spd;
                cityHumudity.innerText =
                    "Luftfuktighet %: " + " " + data.data[0].rh;
                cityInfo.innerText =
                    "Väderprognos:" + " " + data.data[0].weather.description;
                cityName.innerText = data.data[0].city_name;
                document.getElementById("res_container").style.border = "2px solid black"
                document.getElementById("res_container").style.display = "flex"
            })
            .catch(function (error) {
                console.log(error);
            });

        fetch(urlForeCast)
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    if (response.statusText === "No Content") throw "Something is wrong..";
                    else return response.json();
                } else {
                    throw "Something went wrong...";
                }
            })
            .then(function (data) {
                for (let i = 1; i < 6; i++) {
                    const forecastSections = document.createElement("div");
                    const dateDiv = document.createElement("h2");
                    const weatherIconDiv = document.createElement("img");
                    let icon = data.data[i].weather.icon;
                    const cityInfoDiv = document.createElement("p");
                    const cityTempDiv = document.createElement("p");

                    dateDiv.innerText = data.data[i].valid_date;
                    weatherIconDiv.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                    cityInfoDiv.innerText = data.data[i].weather.description;
                    cityTempDiv.innerText = data.data[i].temp + " \xB0" + "C";

                    forecastSections.appendChild(dateDiv);
                    forecastSections.appendChild(weatherIconDiv);
                    forecastSections.appendChild(cityTempDiv);
                    forecastSections.appendChild(cityInfoDiv);
                    fiveForecast.appendChild(forecastSections);
                }
            })


        clearSecondDiv();
    }
});



function clearDiv() {
    const divElement = document.querySelectorAll("#resultat *");
    for (let element of divElement) {
        element.innerText = "";
        element.src = "";

    }
}

function clearSecondDiv() {
    const divEl = document.querySelectorAll("#five_forecast *");
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
    }
}

function clearError() {
    const divElement = document.querySelectorAll("#errorDiv *");
    for (let element of divElement) {
        element.innerText = "";
    }
}

function clearWeather() {
    divFiveForecast.style.display = "none";
    divBorder.style.display = "none";
}