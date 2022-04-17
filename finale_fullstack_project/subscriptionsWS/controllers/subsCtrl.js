const express = require('express');
const subsBl = require('../modules/subsBl')
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await subsBl.getAllSubs()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await subsBl.getSubById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await subsBl.createSub(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await subsBl.updateSub(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await subsBl.deleteSub(req.params.id)
    return res.json(data)
})

module.exports = router