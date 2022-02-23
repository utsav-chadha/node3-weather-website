const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Utsav Chadha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Utsav Chadha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Section',
        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligedi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        name:"Utsav Chadha"
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        message: "Help page not found",
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {

        if(error){
            return res.send({
                error
            })
            
        }
        forecast(longitude, latitude, (error, forcastResponse) => {
            if(error){
                res.send({
                    error:"Wrong address"
                })
                return
            }
            res.send({
                location,
                forecast: forcastResponse,
                address: req.query.address
            })
          })
    
        
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('*', (req,res) => {
    res.render('error', {
        message: "Page not found.",
    })
})

app.listen(port, ()=> {
    console.log('Server is running on port ' + port);
})