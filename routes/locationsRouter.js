// import express & uuid
const express = require("express")
const uuid = require("uuid").v4

// set up router
const router = express.Router()

// import location data
let locations = require("../data/locations")

// set all data to lower case to make all sorting/searching case independent
let locationData = locations.map((location) => {
    return {
        id: location.id,
        name: location.name.toLowerCase(),
        country: location.country.toLowerCase(),
        population: location.population
    }
})

// import the sort function
const sort = require("../utils")

// handles GET requests
// gets a list of all locations sorted by name or population in ascending or descending order



// export router
module.export = router 