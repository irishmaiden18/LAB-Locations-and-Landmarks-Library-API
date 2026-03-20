// set up project
// npm init -y
// npm install express morgan uuid lodash
// create a .gitignore file & add node_modules

// import express & morgan
const express = require("express")
const logger = require("morgan")

// set up app variable
const app = express()

// set up middleware

// morgan, using developer settings
app.use(logger("dev"))

// formats our express files
app.use(express.json())

// import router files
const locationsRouter = require("./routes/locationsRouter")
// const landmarksRouter = require("./routes/landmarksRouter")

// set up URL routes to connect to each router
app.use("/api/v1/locations", locationsRouter)
// app.use("/api/v1/landmarks", landmarksRouter)

// set up port
const PORT = 3000

// begin listening
app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
})