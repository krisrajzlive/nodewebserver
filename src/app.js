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
        description: 'Weather forecast',
        name: 'Raj'
    })
})

//app.com/help

xapp.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Hero Xtreme 160R Stealth Edition',
        name: 'Raj'
    })
})

//app.com/about

xapp.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        description: 'This is about myself',
        name: 'Raj'
    })
})

//app.com/weather
xapp.get('/weather', (req, res) => {
    res.send('Weather page',{
        title: 'Weather',
        description: 'hmmmm thinking of it...',
        name: 'Raj'
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

xapp.listen(3000, () => {
    console.log('Server is up on port 3000')
})