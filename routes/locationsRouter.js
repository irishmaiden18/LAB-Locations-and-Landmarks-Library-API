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
        res.json ({
            message: "success",
            payload: sortedLocations
        })

    // send an error response with the error text
    } catch (error) {

        res.status(500).json({
            message: "failure",
            payload: error.message
        })

    }

})

// handles POST requests
router.post("/", (req, res) => {

    try {
        // make sure the three required fields are actually present in the incoming request (name, country and population)
        if ((req.body.name) && (req.body.country) && (req.body.population)) {

            // determine whether location is already in our list
            const foundLocale = locationData.find((location) => {
                return location.name === req.body.name.toLowerCase()
            })

            // if the location is not in our list
            if (!foundLocale) {

                // create a new object using the data from the request body with a generated uuid -- this lets us set the id without user imput
                // make sure everything is lowercase for consistent searching & sorting
                const newLocale = {
                    id: uuid(),
                    name: req.body.name.toLowerCase(),
                    country: req.body.country.toLowerCase(),
                    population: req.body.population
                }

                // add new location to our list
                locationData.push(newLocale)

                // send a response to the user
                res.json ({
                    message: "success",
                    messageDetail: `${newLocale.name} has been successfully added to the list!`,
                    payload: newLocale
                })

            // if the location is already in our list
            } else {

                // send a response to the user
                res.status(500).json ({
                    message: "failure",
                    payload: `${req.body.name} is already in the list, could NOT add!`
                })

            }

        // if the three fields are not all included
        } else {

            // send a response to the user telling them we need more information before we can add the location
            res.status(500).json ({
                message: "failure",
                payload: "We don't have enough information to add your location to the list. Please make sure you include a location name, country and population"
            })

        }

    // send an error response with the error text
    } catch (error) {

        res.status(500).json ({
            message: "failure",
            payload: error.message
        })

    }

})

// handles PUT requests
router.put("/:id", (req, res) => {

    try {

        // figure out whether the location user wants to update is in our list
        const foundLocation = locationData.find((location) => {
            return location.id === req.params.id
        })

        // if the location is in our list
        if (foundLocation) {

            // create a new object to update the location with that features the properties the user is giving (do NOT include the id as we don't want them to be allowed to update that), keep the old properties if a new one isn't given
            const locationToUpdate = {
                name: req.body.name || foundLocation.name,
                country: req.body.country || foundLocation.country,
                population: req.body.population || foundLocation.population
            }

            // create a second new object with the properties of the first object but all set to lower case. Since the properties might not be given by the user we can't lowercase it above
            const casedLocationToUpdate = {
                name: locationToUpdate.name.toLowerCase(),
                country: locationToUpdate.country.toLowerCase(),
                population: locationToUpdate.population
            }

            // update our location with the second new object we created
            Object.assign(foundLocation, casedLocationToUpdate)

            // send a success response including the updated object
            res.json ({
                message: "success",
                messageDetail: `${foundLocation.name} has been successfully updated!`,
                payload: foundLocation
            })

        // if the location is NOT in our list
        } else {

            // send a failure response
            res.status(404).json ({
                message: "failure",
                payload: "Location was not found in our list, could NOT update!"
            })

        }

    // send an error response with the error text
    } catch (error) {

        res.status(500).json ({
            message: "failure",
            payload: error.message
        })

    }

})

// export router
module.exports = router 