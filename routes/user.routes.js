const express = require('express')
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');

router.route('/login').post(
    passport.authenticate('local',{ session: false }),
    (req, res) => {
        res.send({token: req.user});
    }
);

router.route('/register').post(
    async (req, res, next) => {
        try {
            if (!req.body.username || !req.body.email || !req.body.password){
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: 'Registration need username, email and password! Please provide these fields in your request.'
                });
            }

            let exists = await userModel.exists({username: req.body.username});
            if (exists) {
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: 'Username already is in use! Please choose another username.'
                });
            }

            exists = await userModel.exists({email: req.body.email});
            if (exists) {
                return res.status(400).send({
                    statusCode: 400,
                    status: 'Bad request',
                    message: 'Email already is in use! Looks like you forgot your previous registration.'
                });
            }

            const user = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            await user.validate();
            await user.save({validateBeforeSave: false});
            return res.status(201).send();

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                const validationErrors = [];

                if (e.errors.username){
                    validationErrors.push({
                        field: e.errors.username.path,
                        message: e.errors.username.message
                    });
                }

                if (e.errors.email){
                    validationErrors.push({
                        field: e.errors.email.path,
                        message: e.errors.email.message
                    });
                }

                if (e.errors.password){
                    validationErrors.push({
                        field: e.errors.password.path,
                        message: e.errors.password.message
                    });
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

router.route('/user').get(
    passport.authenticate('bearer',{ session: false }),
    async (req, res, next) => {
        if (req.user.accessLevel !== 'Admin'){
            return res.status(403).send({
                statusCode: 403,
                status: 'Forbidden',
                message: 'You are not authorized to get the requested resource.'
            });
        }

        try {
            const users = await userModel.find({}).sort({createdAt: 'desc'});
            return res.status(200).json(users);
        } catch (e){
            next(e);
        }
    }
);

router.route('/user/me').get(
    passport.authenticate('bearer',{ session: false }),
    (req, res) => {
        res.status(200).send({
            username: req.user.username,
            email: req.user.email,
            accessLevel: req.user.accessLevel,
            registrationDate: req.user.createdAt,
            lastModified: req.user.updatedAt
        });
    }
);

module.exports = router;