const express = require('express');
const cors = require('cors');
const showsCtrl = require('./controllers/showsCtrl')
const membersCtrl = require('./controllers/membersCtrl')
const subsCtrl = require('./controllers/subsCtrl')
const port = 8000

require ('./configs/database')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/shows', showsCtrl)
app.use('/members', membersCtrl)
app.use('/subs', subsCtrl)

app.listen(port, () => {
    console.log('listening')
})
