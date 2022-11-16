// Dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3000

// Database
const pokemons = require('./models/pokemon.js')

// Get Route
app.get('/pokemon', (req, res) => {
    res.send("Working!")
})

// Server Listening
app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})