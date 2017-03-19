import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let VirtualClosetSchema = new Schema ({
    name: String,
    color: String,
    description: String,
    type: String,
    style: String,
    urlPath: String
});

module.exports = mongoose.model('VirtualCloset', VirtualClosetSchema);