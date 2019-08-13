const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

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
    res.send({
        location: 'Yucaipa',
        temperature: 80
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})