'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _virtual_closet = require('../model/virtual_closet');

var _virtual_closet2 = _interopRequireDefault(_virtual_closet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // CRUD

    // 'api/v1/closet/add' - Create
    api.post('/add', function (req, res) {
        var newRest = new _virtual_closet2.default();
        newRest.name = req.body.name;
        newRest.color = req.body.color;
        newRest.description = req.body.description;
        newRest.type = req.body.type;
        newRest.style = req.body.style;
        newRest.urlPath = req.body.urlPath;
        newRest.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Item saved successfully' });
        });
    });

    // 'api/v1/closet' - Read
    api.get('/', function (req, res) {
        _virtual_closet2.default.find({}, function (err, closetItems) {
            if (err) {
                res.send(err);
            }
            res.json(closetItems);
        });
    });

    // 'api/v1/closet/:id' - Read 1
    api.get('/:id', function (req, res) {
        _virtual_closet2.default.findById(req.params.id, function (err, closetItem) {
            if (err) {
                res.send(err);
            }
            res.json(closetItem);
        });
    });

    // 'api/v1/closet/:id' - Update
    api.put('/:id', function (req, res) {
        _virtual_closet2.default.findById(req.params.id, function (err, closetItem) {
            if (err) {
                res.send(err);
            }
            closetItem.name = req.body.name;
            closetItem.color = req.body.color;
            closetItem.description = req.body.description;
            closetItem.type = req.body.type;
            closetItem.style = req.body.style;
            closetItem.urlPath = req.body.urlPath;
            closetItem.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "VirtualCloset info updated" });
            });
        });
    });

    // 'api/v1/closet/:id' - Delete
    api.delete('/:id', function (req, res) {
        _virtual_closet2.default.remove({
            _id: req.params.id
        }, function (err, closetItem) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "VirtualCloset successfully removed" });
        });
    });

    return api;
};
//# sourceMappingURL=virtual_closet.js.map