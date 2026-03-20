// create a sort function to use in both routers

// import lodash
const _ = require("lodash")

// create a sort function
const sort = (data, sortBy, order) => {

    // sort data with the lodash function -- default sorts in ascending order
    const sortedData = _.sortBy(data, sortBy)

    // if order is desc
    if (order === "desc") {

        // flip the sort -- modifies the array itself
        sortedData.reverse()
    }

    return sortedData
}

// export the function so we can use it elsewhere
module.exports = sort
