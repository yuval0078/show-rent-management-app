const express = require('express');
const usersBl = require('../modules/usersDB_BL')
const router = express.Router();

router.get('/', async (req, res) => { 
    let data = await usersBl.getAllUsers()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = {}
    data.user = await usersBl.getUserById(req.params.id)
    data.premusson = 
    console.log(data)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await usersBl.createUser(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await usersBl.updateUser(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await usersBl.deleteUser(req.params.id)
    return res.json(data)
})

module.exports = router