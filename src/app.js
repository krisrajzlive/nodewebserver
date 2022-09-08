const express = require('express')

const xapp = express()

//app.com
xapp.get('', (req, res) => {
    res.send('Hello world')
})


//app.com/help
xapp.get('/help', (req, res) => {
    res.send('help page')
})

//app.com/about
xapp.get('/about', (req, res) => {
    res.send('About page')
})

//app.com/weather
xapp.get('/weather', (req, res) => {
    res.send('Weather page')
})

xapp.listen(3000, () => {
    console.log('Server is up on port 3000')
})