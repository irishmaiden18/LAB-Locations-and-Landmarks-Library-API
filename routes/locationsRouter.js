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
router.get("/", (req, res) => {

    try {
        // use query parameters to figure out how to sort
        // if there are no parameters, sort by name in ascending order
        let sortBy = req.query.sortBy || "name"
        let order = req.query.order || "asc"

        // account for casing of the sortBy parameters
        sortBy = sortBy.toLowerCase()
        order = order.toLowerCase()

        // call sort function on the location data
        const sortedLocations = sort(locationData, sortBy, order)

        // send a response to the user including the sorted data
        res.json({
            message: "success",
            payload: sortedLocations
        })
    } catch (error) {
        res.status(500).json({
            message: "failure",
            payload: error.message
        })
    }
})



// export router
module.exports = router 