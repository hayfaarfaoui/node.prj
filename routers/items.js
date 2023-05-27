const express = require('express');
const auth = require("../middleware/auth");
const Item = require('../models/item');
const { mongoose } = require('mongoose');

const router = express.Router()

const items = []

// GET 
router.get('/', auth,(req, res) => {
    Item.find().exec()
    .then(items => res.send(items))
    .catch(err => res.status(400).send())
})

// POST 
router.post('/',auth, (req, res) => {
    const item = new Item(req.body)
    item.save()
        .then(r => res.send(r))
        .catch(err => res.status(400).send(err))
})

// GET 
router.get('/:id', auth,(req, res) => {
    Item.findById(req.params.id).populate("owner").exec()
    .then(item => {
        if (item == null) res.status(404).send()
        else { res.send(item) }
    })
    .catch(err => res.status(400).send(err))
})

// PUT 
/*router.put('/:id',auth, (req, res) => {
    Item.findById(req.param.id)
    .then(i => {
        item.updatedAt = new Date().toISOString()
        item.name = req.body.name
        // save, then return updated item
        item.save().then(i => res.send(i))
    })
    .catch(err => res.status(400).send(err))
})*/
router.put("/:id", auth, async (req, res) => {
    try {
  
        const result = await Item.updateOne({ _id: req.params.id }, { ...req.body })
        if (result.modifiedCount) {
            itemUpdated = await Ityem.findOne({ _id: req.params.id })
            //return res.send({ msg: "update suuccess",  userupdated })
            return res.send(itemUpdated)
        }
  
        res.status(400).send({ msg: " aleardy update " })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
  })

// DELETE 
router.delete('/:id',auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id).exec()
    .then(result => res.status(204).send())
    .catch(err => res.status(404).json(err))
})


let unit = "aaa"

module.exports = router