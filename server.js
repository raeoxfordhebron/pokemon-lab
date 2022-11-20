// Dependencies
require("dotenv").config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))

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

// Create Route
app.post('/pokemon', (req, res) => {
    pokemons.push(req.body)
    res.redirect("/pokemon")
})

// Edit Route
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        pokemon: pokemons[req.params.id],
        index: req.params.id
    })
})

// Update Route
app.put("/pokemon/:id", (req, res) => {
    pokemons[req.params.id] = req.body
    res.redirect("/pokemon")
})

// Delete Route
app.delete("/pokemon/:id", (req, res) => {
    pokemons.splice(req.params.id, 1)
    res.redirect("/pokemon")
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