const path = require('path')
const express = require('express')
const hbs = require('hbs')

const xapp = express()

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
        title: 'Home',
        name: 'This is home page'
    })
})

//app.com/help

xapp.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hero Xtreme 160R Stealth Edition'
    })
})

//app.com/about

xapp.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohandas Karamchand Gandhi'
    })
})

//app.com/weather
xapp.get('/weather', (req, res) => {
    res.send('Weather page',{
        title: 'Weather',
        name: 'Weather forecast'
    })
})

xapp.listen(3000, () => {
    console.log('Server is up on port 3000')
})