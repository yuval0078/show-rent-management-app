const express = require('express');
const membersBl = require('../modules/membersBl')
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await membersBl.getAllMembers()
    return res.json(data)
})

router.get('/:id', async (req, res) => {
    let data = await membersBl.getMemberById(req.params.id)
    return res.json(data)
})

router.post('/', async (req, res) => {
    let data = await membersBl.createMember(req.body)
    return res.json(data)
})

router.put('/:id', async (req, res) => {
    let data = await membersBl.updateMember(req.params.id, req.body)
    return res.json(data)
})

router.delete('/:id', async (req, res) => {
    let data = await membersBl.deleteMember(req.params.id)
    return res.json(data)
})

module.exports = router