const express = require('express');
const showsBl = require('../modules/showsBl')
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await showsBl.getAllShows()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await showsBl.getShowById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await showsBl.createShow(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await showsBl.updateShow(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await showsBl.deleteShow(req.params.id)
    return res.json(data)
})

module.exports = router