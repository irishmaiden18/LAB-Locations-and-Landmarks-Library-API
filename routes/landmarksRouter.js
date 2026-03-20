// import express & uuid
const express = require("express")
const uuid = require("uuid").v4

// set up router
const router = express.Router()

// import landmark data
const landmarks = require("../data/landmarks")

// set all data to lower case to make all sorting/searching case independent
const landmarkData = landmarks.map((landmark) => {
    return {
        id: landmark.id,
        name: landmark.name.toLowerCase(),
        city: landmark.city.toLowerCase(),
        yearBuilt: landmark.yearBuilt
    }
})

// import sort function
const sort = require("../utils")

// handles GET requests
// gets a list of all the landmarks sorted by name or year build in ascending or descending order
router.get("/", (req, res) => {

    try {

        // use query parameters to figure out how to sort the dtata
        // if there are no parameters, sort by name in ascending order
        let sortBy = req.query.sortBy || "name"
        let order = req.query.order || "asc"

        // account for casing of the parameters
        if (sortBy.toLowerCase() === "name") {

            sortBy = sortBy.toLowerCase()

        } else if (sortBy.toLowerCase() === "yearbuilt") {

            sortBy = "yearBuilt"

        }

        order = order.toLowerCase()

        // call the sort function
        const sortedLandmarks = sort(landmarkData, sortBy, order)

        // send a response to the user including the sorted data
        res.json ({
            message: "success",
            payload: sortedLandmarks
        })

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
