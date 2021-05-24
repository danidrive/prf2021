const express = require('express')
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const productModel = mongoose.model('product');

router.route('/cart').get(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const user = await userModel.findOne({username: req.user.username}, '-_id cart')
                .populate({path: 'cart', populate:{ path: 'product', model: 'product', select: '-__v'}});

            const cart = []
            for (const cartElement of user.cart) {
                cart.push({product: cartElement.product, amount: cartElement.amount})
            }

            return res.status(200).json(cart);
        } catch (e) {
            next(e);
        }
    }
);

router.route('/cart').post(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        if (!req.body.product || !req.body.amount || req.body.amount <= 0) {
            return res.status(400).send({
                statusCode: 400,
                status: 'Bad request',
                message: 'Your request must contain product and amount. Amount must be a positive integer.'
            });
        }

        try {
            const user = await userModel.findOne({username: req.user.username}, 'cart');
            const product = await productModel.findOne( {_id: req.body.product}, 'stock');

            if (req.body.amount > product.stock) {
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: 'Not enough product in stock. Your request cannot be fulfilled.'
                })
            }

            let contains = false;
            for (const cartElement of user.cart) {
                if (cartElement.product.toString() === req.body.product){
                    if (cartElement.amount + req.body.amount > product.stock) {
                        return res.status(400).send({
                            statusCode: 400,
                            status: 'Bad request',
                            message: 'Not enough product in stock. Your request cannot be fulfilled.'
                        })
                    } else {
                        cartElement.amount += req.body.amount;
                        contains = true;
                        break;
                    }
                }
            }

            if (!contains){
                user.cart.push({product: req.body.product, amount: req.body.amount});
            }

            await user.save();
            res.status(204).send();

        } catch (e) {
            next(e);
        }
    }
);

router.route('/cart/:id').put(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        if (!req.body.amount || req.body.amount <= 0) {
            return res.status(400).send({
                statusCode: 400,
                status: 'Bad request',
                message: 'Your request must contain amount. Amount must be a positive integer.'
            });
        }

        try {
            const user = await userModel.findOne({username: req.user.username}, 'cart');
            const product = await productModel.findOne( {_id: req.params.id}, 'stock');

            if (req.body.amount > product.stock) {
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: 'Not enough product in stock. Your request cannot be fulfilled.'
                })
            }

            let contains = false;
            for (const cartElement of user.cart) {
                if (cartElement.product.toString() === req.params.id){
                    cartElement.amount = req.body.amount;
                    contains = true;
                    break;
                }
            }

            if (!contains){
                return res.status(404).send({
                    statusCode: 404,
                    status: 'Not found',
                    message: 'Your request request cannot be fulfilled because the requested product is not in your cart.'
                })
            }

            await user.save();
            res.status(204).send();

        } catch (e) {
            next(e);
        }
    }
);

router.route('/cart/').delete(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const user = await userModel.findOne({username: req.user.username}, 'cart');
            user.cart = []
            await user.save();
            res.status(204).send();

        } catch (e) {
            next(e);
        }
    }
);

router.route('/cart/:id').delete(
    passport.authenticate('bearer', { session: false }),
    async (req, res, next) => {
        try {
            const user = await userModel.findOne({username: req.user.username}, 'cart');
            user.cart = user.cart.filter(value => { return value.product.toString() !== req.params.id });
            await user.save();
            res.status(204).send();

        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;