# Unit-2-Express-LAB-Router

## Objective

Create a simple Express API with two independent resources:
locations and landmarks.

This assignment reinforces:
- Express router structure
- Basic CRUD operations
- Route parameters vs query parameters
- Simple sorting logic

--------------------------------------------------

## Project Setup
Inside a new folder:
1. DONE-- Create an index.js file
2. DONE-- Create a routes folder
3. DONE-- Inside routes, create:
   - locationsRouter.js
   - landmarksRouter.js
4. DONE-- Initialize the Node project:

`npm init -y`

5. DONE-- Install dependencies:

`npm install express morgan uuid lodash`

--------------------------------------------------

## Locations Router (/routes/locationsRouter.js)

### Data Model

DONE-- Utilize this array of locations:

```
let locations = [
  {
    id: uuid(),
    name: "Seattle",
    country: "USA",
    population: 749000
  },
  {
    id: uuid(),
    name: "Tokyo",
    country: "Japan",
    population: 13900000
  },
  {
    id: uuid(),
    name: "Reykjavik",
    country: "Iceland",
    population: 131000
  },
  {
    id: uuid(),
    name: "Berlin",
    country: "Germany",
    population: 3660000
  },
  {
    id: uuid(),
    name: "Paris",
    country: "France",
    population: 2160000
  }
];
```

--------------------------------------------------

### Routes to Implement

DONE-- GET /locations

- Returns all locations
- Supports optional query parameters:
  - sortBy=name|population
  - order=asc|desc

--------------------------------------------------

DONE-- POST /locations

- Adds a new location
- Required fields:
  - name
  - country
  - population

--------------------------------------------------

DONE-- PUT /locations/:id

- Updates a location by ID
- Allowed fields:
  - name
  - country
  - population

--------------------------------------------------

DONE-- DELETE /locations/:id

- Deletes a location by ID

--------------------------------------------------

## Landmarks Router (/routes/landmarksRouter.js)

### Data Model

DONE-- Create an array of landmarks using uuid() for unique IDs.

Example:
```
let landmarks = [
  {
    id: uuid(),
    name: "Eiffel Tower",
    city: "Paris",
    yearBuilt: 1889
  },
  {
    id: uuid(),
    name: "Louvre Museum",
    city: "Paris",
    yearBuilt: 1793
  },
  {
    id: uuid(),
    name: "Statue of Liberty",
    city: "New York City",
    yearBuilt: 1886
  },
  {
    id: uuid(),
    name: "Central Park",
    city: "New York City",
    yearBuilt: 1857
  },
  {
    id: uuid(),
    name: "Colosseum",
    city: "Rome",
    yearBuilt: 80
  },
  {
    id: uuid(),
    name: "Pantheon",
    city: "Rome",
    yearBuilt: 126
  },
  {
    id: uuid(),
    name: "Tokyo Tower",
    city: "Tokyo",
    yearBuilt: 1958
  },
  {
    id: uuid(),
    name: "Meiji Shrine",
    city: "Tokyo",
    yearBuilt: 1920
  }
];
```

--------------------------------------------------

### Routes to Implement

DONE-- GET /landmarks

- Returns all landmarks
- Supports optional query parameters:
  - sortBy=name|yearBuilt
  - order=asc|desc

--------------------------------------------------

DONE-- POST /landmarks

- Adds a new landmark
- Required fields:
  - name
  - city
  - yearBuilt

--------------------------------------------------

PUT /landmarks/:id

- Updates a landmark by ID
- Allowed fields:
  - name
  - city
  - yearBuilt

--------------------------------------------------

DELETE /landmarks/:id

- Deletes a landmark by ID

--------------------------------------------------

## Testing

- Test all routes using Postman
- Verify:
  - Sorting works in both directions
  - CRUD operations work for both routers

--------------------------------------------------
