const express = require('express');
const premissionsBl = require('../modules/premissions_BL')
const router = express.Router();

router.get('/', async (req, res) => { 
    let data = await premissionsBl.getAllPrems()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await premissionsBl.getPremById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await premissionsBl.addPrem(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await premissionsBl.updatePrem(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await premissionsBl.deletePrem(req.params.id)
    return res.json(data)
})

module.exports = router