// import express & uuid
const express = require("express")
const uuid = require("uuid").v4

// set up router
const router = express.Router()

// import landmark data
const landmarks = require("../data/landmarks")

// set all data to lower case to make all sorting/searching case independent
let landmarkData = landmarks.map((landmark) => {
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

// handles POST requests
router.post("/", (req, res) => {

    try {

        // if the three required fields are actually present in the incoming request (name, city, and yearBuilt)
        if ((req.body.name) && (req.body.city) && (req.body.yearBuilt)) {

            // determine whether that landmark is already in our list
            const foundLandmark = landmarkData.find((landmark) => {
                return landmark.name === req.body.name.toLowerCase()
            })

            // if the landmark is NOT in our list
            if (!foundLandmark) {
            
                // create a new object using the data from the request body with a generated uuid -- this lets us set the id without user input
                // make sure everything is lowercase for consistent searching and sorting
                const newLandmark = {
                    id: uuid(),
                    name: req.body.name.toLowerCase(),
                    city: req.body.city.toLowerCase(),
                    yearBuilt: req.body.yearBuilt
                }

                // add the new landmark to our list
                landmarkData.push(newLandmark)

                // send a response to the user containing the newly added landmark
                res.json ({
                    message: "success",
                    messageDetail: `${newLandmark.name} has been successfully added to our list!`,
                    payload: newLandmark
                })
            
            // if the landmark is already in our list
            } else {

                // send a response to the user
                res.status(500).json ({
                    message: "failure",
                    payload: `${foundLandmark.name} is already in our list so we CANNOT add it.`
                })

            }

        // if the three fields are NOT provided
        } else {

            // send a response to the user telling them we need more information before we can add the landmark
            res.status(500).json ({
                message: "failure",
                payload: "We don't have enough information to add your landmark to the list. Please make sure you include a name, city and yearBuilt for your landmark."
            })
        }

    // send the user an error response with the error text
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

        // determine whether the landmark the user wants to update is in our list
        const foundLandmark = landmarkData.find((landmark) => {
            return landmark.id === req.params.id
        })

        // if the landmark is in our list
        if (foundLandmark) {

            // create a new object to update the landmark with the properties the user wants to update (NOT including the id, we don't want the user able to update the id)
            // keep the old properties if a new one isn't given by the user
            const landmarkToUpdate = {
                name: req.body.name || foundLandmark.name,
                city: req.body.city || foundLandmark.city,
                yearBuilt: req.body.yearBuilt || foundLandmark.yearBuilt
            }

            // create a second new object with the properties of the first object but all set to lower case. We can't lowercase the first new object because properties may not exist
            const casedLandmarkToUpdate = {
                name: landmarkToUpdate.name.toLowerCase(),
                city: landmarkToUpdate.city.toLowerCase(),
                yearBuilt: landmarkToUpdate.yearBuilt
            }

            // update our landmark with the second new object we created
            Object.assign(foundLandmark, casedLandmarkToUpdate)

            // send a success response that includes the updated object
            res.json ({
                message: "success",
                messageDetail: `${foundLandmark.name} successfully updated!`,
                payload: foundLandmark
            })

        // else, if the landmark is NOT in our list
        } else {

            // send a failure response to the user
            res.status(404).json ({
                message: "failure",
                payload: "The landmark you wanted to update is NOT in our list. Could NOT update!"
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

// handles DELETE requests
router.delete("/:id", (req, res) => {

    try {

        // figure out whether the landmark being deleted is actually in our list
        const foundLandmark = landmarkData.find((landmark) => {
            return landmark.id === req.params.id
        })

        // if the landmark to be deleted IS in our list
        if (foundLandmark) {

            // create a results array made up of all the landmarks that do NOT have the ID the user has provided
            const results = landmarkData.filter((landmark) => {
                return landmark.id !== foundLandmark.id
            })

            // reassign landmarkData to the results array
            landmarkData = results

            // send a success response that includes the new landmarkData
            res.json ({
                message: "success",
                messageDetail: `The ${foundLandmark.name} had been successfully removed from the list!`,
                payload: landmarkData
            })

        // if the landmark to be deleted is NOT in our list
        } else {

            // send a failure response to the user
            res.status(404).json ({
                message: "failure",
                payload: "The landmark was NOT found in our list, CANNOT delete!"
            })

        }

    // send an error response that includes the error message to the user
    } catch (error) {

        res.status(500).json ({
            message: "failure",
            payload: error.message
        })

    }

})

// export router
module.exports = router
