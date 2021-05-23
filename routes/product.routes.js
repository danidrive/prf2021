const express = require('express')
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const productModel = mongoose.model('product');

router.route('/products').get(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const products = await productModel.find({})
            res.status(200).json(products);
        } catch (e) {
            next(e);
        }
    }
);

router.route('/products').post(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {

        if (req.user.accessLevel !== 'Admin'){
            return res.status(403).send({
                statusCode: 403,
                status: 'Forbidden',
                message: 'You are not allowed to perform this operation.'
            });
        }

        try {
            const model = new productModel({
                name: req.body.name,
                description: req.body.description,
                manufacturer: req.body.manufacturer,
                stock: req.body.stock,
                price: req.body.price
            });
            const result = await model.save()
            res.status(201).json(result);

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                const validationErrors = [];
                const properties = ['name', 'description', 'manufacturer', 'stock', 'price']

                for (const property of properties) {
                    if (e.errors[property]){
                        validationErrors.push({
                            field: e.errors[property].path,
                            message: e.errors[property].message
                        });
                    }
                }

                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    validationErrors: validationErrors
                });
            } else{
                next(e);
            }
        }
    }
);

router.route('/products/:id').put(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {

        if (req.user.accessLevel !== 'Admin'){
            return res.status(403).send({
                statusCode: 403,
                status: 'Forbidden',
                message: 'You are not allowed to perform this operation.'
            });
        }

        try {

            const product = await productModel.findOne({_id: req.params.id});

            if (!product){
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: `Resource does not exists with id: ${req.params.id}`
                });
            }

            product.name = req.body.name;
            product.description = req.body.description;
            product.manufacturer = req.body.manufacturer;
            product.stock = req.body.stock;
            product.price = req.body.price;

            const result = await product.save();
            res.status(200).json(result);

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                const validationErrors = [];
                const properties = ['name', 'description', 'manufacturer', 'stock', 'price']

                for (const property in properties) {
                    if (e.errors[property].name){
                        validationErrors.push({
                            field: e.errors[property].path,
                            message: e.errors[property].message
                        });
                    }
                }

                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    validationErrors: validationErrors
                });
            } else{
                next(e);
            }
        }
    }
);

router.route('/products/:id').delete(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {

        if (req.user.accessLevel !== 'Admin'){
            return res.status(403).send({
                statusCode: 403,
                status: 'Forbidden',
                message: 'You are not allowed to perform this operation.'
            });
        }

        try {

            await productModel.deleteOne({_id: req.params.id});
            res.status(200).send();

        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;