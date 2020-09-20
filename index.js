require('dotenv').config();

const express = require('express')
const Sequelize = require('sequelize')


const app = express()

const port = 3000
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString)



app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


sequelize

.authenticate()

.then(() => {

console.log('Connection has been established successfully.');

})

.catch(err => {

console.error('Unable to connect to the database:', err);

});