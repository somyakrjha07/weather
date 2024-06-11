document.addEventListener("DOMContentLoaded", function () {
    const apikey = "097f9900656a949d6912abcfdafa7288";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherInfo = document.querySelector(".weather");
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apikey}`);
            if (!response.ok) throw new Error("City not found");
            const data = await response.json();
            console.log(data);

            cityElement.innerHTML = data.name;
            tempElement.innerHTML = data.main.temp + "°C";
            humidityElement.innerHTML = data.main.humidity + "%";
            windElement.innerHTML = data.wind.speed + " Km/hr";

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
            }

            // Display the weather information
            weatherInfo.style.display = "block";
        } catch (error) {
            alert(error.message);
        }
    }

    function handleSearch() {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }

    searchBtn.addEventListener("click", handleSearch);

    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
});
