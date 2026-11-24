/* WS09 – JavaScript libraries
 * Axios retrieves the forecast, Chart.js displays it and jQuery handles
 * the optional animated message.
 */
let forecast = [];
let temperatureChart = null;
let currentCity = "Helsinki";

const form = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#kaupunki");
const apiKeyInput = document.querySelector("#apiKey");
const statusMessage = document.querySelector("#statusMessage");
const cityName = document.querySelector("#cityName");
const chartType = document.querySelector("#chartType");
const summary = document.querySelector("#forecastSummary");

// Remember the last searched city and use it to prefill the city field.
const savedCity = localStorage.getItem("ws09LastCity");
if (savedCity) {
  cityInput.value = savedCity;
  cityName.textContent = savedCity;
  currentCity = savedCity;
}

async function getForecast(city, apiKey) {
  // First find the city's latitude and longitude.
  const locationsResponse = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: { q: city, limit: 1, appid: apiKey }
  });

  const place = locationsResponse.data[0];
  if (!place) return [];

  // Then retrieve the five-day forecast (40 three-hour forecast entries).
  const forecastResponse = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      lat: place.lat,
      lon: place.lon,
      units: "metric",
      appid: apiKey
    }
  });
  return forecastResponse.data.list || [];
}

async function haeSaa(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!city || !apiKey) {
    showStatus("Please enter both a city and your OpenWeather API key.", true);
    return;
  }

  // Optional jQuery bonus: show the hidden message while the request runs.
  $("#saaYllatys").stop(true, true).show();
  showStatus("Loading the forecast…");
  document.querySelector("#haeSaaPainike").disabled = true;

  try {
    forecast = await getForecast(city, apiKey);
    if (forecast.length === 0) {
      forecast = [];
      clearChart();
      summary.textContent = "No forecast was found for that city.";
      showStatus("City not found. Check the spelling and try again.", true);
      return;
    }

    currentCity = city;
    localStorage.setItem("ws09LastCity", city);
    cityName.textContent = city;
    updateTemperatureSummary();
    paivitaKaavio();
    showStatus(`Forecast loaded successfully for ${city}.`);
  } catch (error) {
    console.error("Weather request failed:", error);
    const apiMessage = error.response?.data?.message;
    if (error.response?.status === 401) {
      showStatus("The API key is invalid or not active yet. Check your OpenWeather API key.", true);
    } else if (error.response?.status === 404) {
      showStatus("City not found. Check the city name and try again.", true);
    } else {
      showStatus(apiMessage ? `Could not load forecast: ${apiMessage}.` : "Could not load weather data. Check your internet connection and try again.", true);
    }
  } finally {
    // The jQuery bonus message is hidden whether the request succeeds or fails.
    $("#saaYllatys").hide();
    document.querySelector("#haeSaaPainike").disabled = false;
  }
}

function updateTemperatureSummary() {
  const temperatures = forecast.map(entry => entry.main.temp);
  const lowest = Math.min(...temperatures);
  const highest = Math.max(...temperatures);
  summary.textContent = `${currentCity} · ${lowest.toFixed(1)} to ${highest.toFixed(1)} °C`;
}

function paivitaKaavio() {
  if (forecast.length === 0) return;

  const labels = forecast.map(entry => {
    const date = new Date(`${entry.dt_txt.replace(" ", "T")}Z`);
    return date.toLocaleString("en-GB", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC"
    });
  });
  const temperatures = forecast.map(entry => entry.main.temp);

  if (temperatureChart) temperatureChart.destroy();
  const context = document.querySelector("#tempChart").getContext("2d");
  temperatureChart = new Chart(context, {
    type: chartType.value,
    data: {
      labels,
      datasets: [{
        label: `Temperature in ${currentCity} (°C)`,
        data: temperatures,
        borderColor: "#2563eb",
        backgroundColor: chartType.value === "bar" ? "rgba(37, 99, 235, 0.65)" : "rgba(37, 99, 235, 0.14)",
        borderWidth: 2,
        fill: chartType.value === "line",
        tension: 0.3,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: { legend: { display: true } },
      scales: {
        x: { ticks: { maxTicksLimit: 10, maxRotation: 0 } },
        y: { title: { display: true, text: "Temperature (°C)" } }
      }
    }
  });
}

function clearChart() {
  if (temperatureChart) {
    temperatureChart.destroy();
    temperatureChart = null;
  }
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

form.addEventListener("submit", haeSaa);
chartType.addEventListener("change", paivitaKaavio);
