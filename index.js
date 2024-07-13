const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded())

// Create a model/ schema
const User = mongoose.model('User', { //users
  firstName: String,
  lastName: String,
  email: String,
  avatar: String
})

app.get('/', (req, res) => {
  res.json({
    status: 'Server is up :)',
    now: new Date()
  })
})

// READ: GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: 'SUCCESS',
      data: users
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

// CREATE: POST /users
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, avatar } = req.body
    await User.create({ firstName, lastName, email, avatar });
    res.json({
      status: 'SUCCESS',
      message: 'User created successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

// UPDATE: PATCH /users/:id
app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, avatar } = req.body
    await User.findByIdAndUpdate(id, { firstName, lastName, email, avatar });
    res.json({
      status: 'SUCCESS',
      message: 'User updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

// DELETE: DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id);
    res.json({
      status: 'SUCCESS',
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.listen(3000, () => {
  mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Server is running :)'))
  .catch((error) => console.log(error))
})













/*
    # Database (DB): Permanent Storage
      - Two types:
          - 1. SQL (Relational DB)
              - Table and Row format
              - Eg: MySQL, PostgreSQL, SQLite, etc
          - 2. NoSQL (Non-Relational DB)
              - Collection and Document format
              - Eg: MongoDB, AWS DynamoDB, etc

    # Mongoose
      - ODM (Object Data Modeling) for MongoDB

    # REST API
      - https://phpenthusiast.com/theme/assets/images/blog/what_is_rest_api.png
  
      # HTTP Methods: (used for CRUD operations)
        - GET: READ (R) - .find() method
        - POST: CREATE (C) - create() method
        - PATCH: UPDATE (U) - findByIdAndUpdate() method
        - DELETE: DELETE (D) - findByIdAndDelete() method

      # Examples:
        1. Social Media App:
          - Users:
            - GET /users
            - POST /users
            - PATCH /users/:id
            - DELETE /users/:id
          - Chats:
            - GET /chats
            - POST /chats
            - PATCH /chats/:id
            - DELETE /chats/:id
          - Posts:
            - GET /posts
            - POST /posts
            - PATCH /posts/:id
            - DELETE /posts/:id
        2. E-Commerce App:
          - Products:
            - GET /products
            - POST /products
            - PATCH /products/:id
            - DELETE /products/:id
          - Sellers:
            - GET /sellers
            - POST /sellers
            - PATCH /sellers/:id
            - DELETE /sellers/:id
          - Customers:
            - GET /customers
            - POST /customers
            - PATCH /customers/:id
            - DELETE /customers/:id

    # Mongoose Methods:
      - connect(): Connect MongoDB to Node.js server
      - model(): Schema
        - Name of model: Pascal case, Singular form
      - find(): Return all records in the specified collection
      - create(): Insert a new record into the specified collection
      - findByIdAndUpdate(): Update a record in the specified collection by its ID
      - findByIdAndDelete(): Delete a record in the specified collection by its ID

    # Additional Code:
      // # Find a user based on query
        // app.get('/users', async (req, res) => {
        //   try {
        //     const { firstName, lastName } = req.query
        //     const users = await User.find({ firstName, lastName });
        //     res.json({
        //       status: 'SUCCESS',
        //       data: users
        //     })
        //   } catch (error) {
        //     res.status(500).json({
        //       status: 'FAILED',
        //       message: 'Something went wrong'
        //     })
        //   }
        // })
*/