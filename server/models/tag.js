var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name : {
        type : String
    }
});

let Tag = mongoose.model('Tag' , TagSchema)


module.exports = Tag