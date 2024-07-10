const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded())

mongoose.connect('mongodb+srv://ankit:ankit123@cluster0.vss7r9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connection established'))
  .catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.json({
    status: 'Server is up :)',
    now: new Date()
  })
})

app.listen(3000, () => {
  console.log('Server is running :)')
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
*/