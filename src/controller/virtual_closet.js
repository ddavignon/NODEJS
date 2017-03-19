import mongoose from 'mongoose';
import { Router } from 'express';
import VirtualCloset from '../model/virtual_closet';

export default ({ config, db }) => {
    let api = Router();

    // CRUD

    // 'api/v1/closet/add' - Create
    api.post('/add', (req, res) => {
        let newRest = new VirtualCloset();
        newRest.name = req.body.name;
        newRest.color = req.body.color;
        newRest.description = req.body.description;
        newRest.type = req.body.type;
        newRest.style = req.body.style;
        newRest.urlPath = req.body.urlPath;
        newRest.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Item saved successfully' });
        });
    });

    // 'api/v1/closet' - Read
    api.get('/', (req, res) => {
        VirtualCloset.find({}, (err, closetItems) => {
            if (err) {
                res.send(err);
            }
            res.json(closetItems);
        });
    });


    // 'api/v1/closet/:id' - Read 1
    api.get('/:id', (req, res) => {
        VirtualCloset.findById(req.params.id, (err, closetItem) => {
            if (err) {
                res.send(err);
            }
            res.json(closetItem);
        });
    });

    // 'api/v1/closet/:id' - Update
    api.put('/:id', (req, res) => {
        VirtualCloset.findById(req.params.id, (err, closetItem) => {
            if (err) {
                res.send(err);
            }
            closetItem.name = req.body.name;
            closetItem.color = req.body.color;
            closetItem.description = req.body.description;
            closetItem.type = req.body.type;
            closetItem.style = req.body.style;
            closetItem.urlPath = req.body.urlPath;
            closetItem.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "VirtualCloset info updated" });
            });
        });
    });

    // 'api/v1/closet/:id' - Delete
    api.delete('/:id', (req, res) => {
        VirtualCloset.remove({
            _id: req.params.id
        }, (err, closetItem) => {
            if(err) {
                res.send(err);
            }
            res.json({ message: "VirtualCloset successfully removed"});
        });
    });

    return api;
}
