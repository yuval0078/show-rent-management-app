const express = require('express');
const usersJson_BL = require('../modules/usersJson_BL')
const router = express.Router();

router.get('/', async (req, res) => { 
    let data = await usersJson_BL.getAllUsers()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await usersJson_BL.getUserById(req.params.id.toString())
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await usersJson_BL.addUser(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await usersJson_BL.updateUser(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await usersJson_BL.deleteUser(req.params.id)
    return res.json(data)
})

module.exports = router