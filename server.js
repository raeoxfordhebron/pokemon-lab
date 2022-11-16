// Dependencies
require("dotenv").config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000

// Middleware
app.use(morgan("tiny"))
app.use(methodOverride("_method"))

// Database
const pokemons = require('./models/pokemon.js')

// Index Route
app.get('/pokemon', (req, res) => {
    res.render("index.ejs", {
        pokemons
    })
})

// New Route
app.get('/pokemon/new', (req, res) => {
    res.render("new.ejs")
})

// Show Route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemons[req.params.id],
        index: req.params.id
    })
})

// Server Listening
app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})