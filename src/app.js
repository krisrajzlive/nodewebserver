const path = require('path')
const express = require('express')

const xapp = express()

const staticfilepath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates')

xapp.set('view engine', 'hbs')

//setup custom view directory, default is views directory
xapp.set('views',viewsPath)
//setup custom files directory
xapp.use(express.static(staticfilepath))

//app.com
xapp.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        name: 'Raj'
    })
})

//app.com/help

xapp.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hero Xtreme 160R Stealth Edition'
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
    res.send('Weather page')
})

xapp.listen(3000, () => {
    console.log('Server is up on port 3000')
})