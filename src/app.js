const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Youssr'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me ',
        name: 'Youssr'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "How can i help you :D?",
        title: 'Help',
        name: 'Youssr'
    })
})

app.get('/weather', (req, res) => {

  
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({

                location,
                forecast: forecastData , 
                address : req.query.address 
            })
        })

    })

})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Youssr',
        msg: 'Help article not found'
    })
})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term"
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Youssr',
        msg: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')

})