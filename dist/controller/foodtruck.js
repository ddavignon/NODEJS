'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _authmiddleware = require('../middleware/authmiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // CRUD 

    // '/v1/foodtruck/add' - Create
    api.post('/add', _authmiddleware.authenticate, function (req, res) {
        var newFoodTruck = new _foodtruck2.default();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newFoodTruck.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'FoodTruck saved successfully' });
        });
    });

    // '/v1/foodtruck' - Read
    api.get('/', function (req, res) {
        _foodtruck2.default.find({}, function (err, restaurants) {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // '/v1/foodtruck/:id' - Read 1
    api.get('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // '/v1/foodtruck/:id' - Update
    api.put('/:id', _authmiddleware.authenticate, function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "FoodTruck info updated" });
            });
        });
    });

    // '/v1/foodtruck/:id' - Delete
    api.delete('/:id', _authmiddleware.authenticate, function (req, res) {
        _foodtruck2.default.remove({
            _id: req.params.id
        }, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "FoodTruck successfully removed" });
        });
    });

    // add review for a specific foodtruck id
    // '/v1/foodtruck/reviews/add/:id'
    api.post('/reviews/add/:id', _authmiddleware.authenticate, function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            var newReview = new _review2.default();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save(function (err, review) {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Food truck review saved!' });
                });
            });
        });
    });

    // get reviews for a specific food truck id
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', function (req, res) {
        _review2.default.find({ foodtruck: req.params.id }, function (err, reviews) {
            if (err) {
                return res.send(err);
            }
            return res.json(reviews);
        });
    });

    // exercise extending api
    // get all foodtrucks that have a certain food type
    // '/v1/foodtruck/foodtype/:foodtype
    api.get('/foodtype/:foodtype', function (req, res) {
        _foodtruck2.default.find({ foodtype: req.params.foodtype }, function (err, foodtruck) {
            if (err) {
                return res.send(err);
            }
            return res.json(foodtruck);
        });
    });

    return api;
};
//# sourceMappingURL=foodtruck.js.map