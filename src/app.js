const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')

const xapp = express()
const port = process.env.PORT || 3000 // 3000 is the default port, when runs on heroku, it picks the environment port
xapp.use(cors())

const staticfilePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

xapp.set('view engine', 'hbs')

//setup custom view directory, default is views directory
xapp.set('views', viewsPath)

//setup partials directory path
hbs.registerPartials(partialsPath)

//setup custom files directory
console.log('static file path: ', staticfilePath)
xapp.use(express.static(staticfilePath))

//app.com
xapp.get('', (req, res) => {
    res.render("index", {
        title: 'Weather',
        description: 'Weather forecast',
        name: 'Raj'
    })
})

//app.com/help

xapp.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Building help under progress.',
        name: 'Raj'
    })
})

//app.com/about

xapp.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        description: 'Sea shore temple',
        name: 'Raj'
    })
})

//app.com/weather
xapp.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({error:'Please provide an address to search'})
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return res.send({error: error})
        
        let locationdet = {
            location,
            latitude,
            longitude
        }

        forecast(latitude, longitude, (error, {weather, temperature, feelslike} = {}) => {
            if (error)
                return res.send({error: error})
            
            let weatherdet = {
                weather,
                temperature,
                feelslike
            }

            res.send({
                locationDetails: locationdet, 
                weatherDetails: weatherdet
            })
        })  
    })    
})

//anything like help/iot will be redirected here
xapp.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Raj'
    })
})

//404 page, rest of all the above routes will be redirected here
xapp.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Sorry, can't find the page",
        name: 'Raj'
    })
})

xapp.listen(port, () => {
    console.log('Server is up on port ' + port)
})