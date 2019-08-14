const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Wadell'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Daniel Wadell'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Daniel Wadell'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address needs to be provided'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}) => {
        if (error) {
           return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
                res.send({
                    location,
                    address: req.query.address,
                    forecast: forecastData
                })
        })
        
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        errorMessage: 'HELP ARTICLE NOT FOUND',
        title: '404'
    })
})

app.get('/about/*', (req,res) => {
    res.render('error', {
        errorMessage: 'ABOUT ARTICLE NOT FOUND',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'PAGE NOT FOUND',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})