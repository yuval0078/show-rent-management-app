const express = require('express');
const cors = require('cors');

const usersDBCtrl = require('./controllers/usersDBCtrl')
const usersJsonCtrl = require('./controllers/usersJsonCtrl')
const premissionsCtrl = require('./controllers/premissionsCtrl')

const port = 3005

require ('./configs/database')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/login-data', usersDBCtrl)
app.use('/users', usersJsonCtrl)
app.use('/premissions', premissionsCtrl)

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
