const mongoose        = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose'),
Schema                = mongoose.Schema;


const AdminSchema = new Schema({
    email: String
});

AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', AdminSchema);