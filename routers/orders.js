const express = require('express');
const auth = require("../middleware/auth");
const Order = require('../models/order');
const { mongoose } = require('mongoose');

const router = express.Router()

const orders = []

// GET 
router.get('/', auth,(req, res) => {
    Order.find().exec()
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send())
})

// POST 
router.post('/',auth, (req, res) => {
    const order = Order.create(req.body)
    .then(r => res.send(r))
    .catch(err => res.status(400).send(err))
})

// GET 
router.get('/:id', auth,(req, res) => {
    Order.findById(req.params.id).populate("owner").exec()
    .then(order => {
        if (order == null) res.status(404).send()
        else { res.send(order) }
    })
    .catch(err => res.status(400).send(err))
})

// PUT 
// PUT 
/*router.put('/:id',auth, (req, res) => {
    Order.findById(req.param.id)
    .then(i => {
        Order.updatedAt = new Date().toISOString()
        Order.name = req.body.name
        // save, then return updated item
        item.save().then(i => res.send(i))
    })
    .catch(err => res.status(400).send(err))
})*/
router.put("/:id", auth, async (req, res) => {
    try {
  
        const result = await Order.updateOne({ _id: req.params.id }, { ...req.body })
        if (result.modifiedCount) {
            orderUpdated = await User.findOne({ _id: req.params.id })
            //return res.send({ msg: "update suuccess",  userupdated })
            return res.send(orderUpdated)
        }
  
        res.status(400).send({ msg: " aleardy update " })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
  })



// DELETE 
router.delete('/:id',auth, (req, res) => {
    Order.findByIdAndDelete(req.params.id).exec()
    .then(result => res.status(204).send())
    .catch(err => res.status(404).json(err))
})




module.exports = router;
