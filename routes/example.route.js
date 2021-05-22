const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const exampleModel = mongoose.model('example');

router.route('/example').get(async (req, res) => {
    try {
        const order = req.query.order || 'asc';
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;

        if ((order !== 'asc' && order !== 'desc') || isNaN(limit) ||  limit <= 0) {
            res.send('Invalid parameters!');
            return;
        }

        const examples = await exampleModel.find({}).sort({id: order}).limit(limit)
        res.status(200).json(examples);

    } catch (e) {
        console.log('error', e);
    }
});

router.route('/example/:id').get(async (req, res) => {
    try {
        const id = req.params.id;

        if (id.length !== 24){
            res.status(400).send('invalid id');
            return
        }

        const example = await exampleModel.findById(id);

        if (!example){
            res.status(404).send('not found');
            return
        }

        res.status(200).json(example);

    } catch (e) {
        console.log('error', e);
        res.status(500).send('error')
    }
})

router.route('/example').post(async (req, res) => {

    if (!req.body.id || !req.body.value){
        res.status(400).send('missing parameters');
        return;
    }

    try {
        const exists = await exampleModel.exists({id: req.body.id});
        if (exists) {
            res.status(400).send('example already exists');
            return;
        }

        const model = new exampleModel({id: req.body.id, value: req.body.value});
        const result = await model.save()
        res.status(201).json(result);

    } catch (e) {
        console.log(e);
        res.status(500).send('error');
    }
})

module.exports = router;