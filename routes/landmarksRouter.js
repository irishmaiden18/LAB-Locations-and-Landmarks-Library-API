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

// export router
module.exports = router
