const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherSection = document.querySelector('#weather')
const alertSection = document.querySelector('#message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //prevents form refresh
    const location = search.value

    const weatherapiUrl = '/weather?address=' + location

    alertSection.textContent = 'Fetching weather data ...'

    fetch(weatherapiUrl).then((response) => {
        response.json().then((data) => {
            if(data.error)
                alertSection.textContent = data.error
            else
            {
                alertSection.textContent = ''
                weatherSection.innerHTML = 
                'Location: ' + data.locationDetails.location +
                '<br>Latitude: ' + data.locationDetails.latitude +
                '<br>Longitude: ' + data.locationDetails.longitude +
                '<br>Weather: ' + data.weatherDetails.weather[0] + 
                '<br>Temperature: ' + data.weatherDetails.temperature +
                '<br>Feels like: ' + data.weatherDetails.feelslike
            }
    })
})
})