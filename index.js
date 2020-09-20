const express = require('express')
const Sequelize = require('sequelize')

const app = express()

const port = 3000

const sequelize = new Sequelize('postgres://postgres:Vera85hanna@localhost:5432/socratica')



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