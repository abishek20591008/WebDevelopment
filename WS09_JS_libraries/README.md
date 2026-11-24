# WS09 – JavaScript Libraries (completed)

This folder contains the English implementation of Laurea Web Development 1 Workshop 9.

## Features implemented

- Search for a city using the OpenWeather Geocoding API.
- Retrieve the five-day / three-hour forecast with Axios.
- Display forecast temperatures in Celsius with Chart.js.
- Switch between line and bar charts; the chart is redrawn from the saved forecast data.
- Display the lowest and highest forecast temperatures (the selected additional feature).
- Remember the last searched city with `localStorage`.
- Optional jQuery bonus: show the hidden weather message during the request and hide it in `finally`.
- Handle empty input, unknown cities, invalid API keys and request errors.

## Run locally

1. Open `index.html` in VS Code with Live Server, or serve this folder with any local web server.
2. Create an API key in your [OpenWeather account](https://home.openweathermap.org/api_keys).
3. Enter the API key in the password field in the page. The key is not included in this repository.
4. Search for Helsinki or another city, then switch between Line and Bar.

OpenWeather API keys may take some time to become active. The app requires an active key and an internet connection.

## Files

- `index.html` – page structure and CDN library imports.
- `styles.css` – responsive page styling.
- `script.js` – Axios requests, forecast handling, Chart.js rendering and jQuery bonus.

## Testing checklist

- [ ] Search for Helsinki and another city (for example, Tampere).
- [ ] Switch from Line to Bar and confirm the same forecast is displayed.
- [ ] Submit an empty city or API key and confirm validation appears.
- [ ] Search for an unknown city and confirm an error message appears.
- [ ] Enter a valid city again after an error and confirm the chart loads.
- [ ] Refresh after a successful search and confirm the last city is prefilled.

**Note:** Live API requests must be tested in a browser using your own active OpenWeather API key. No API key is committed in these files.
