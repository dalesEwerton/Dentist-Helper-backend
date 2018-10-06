const restful = require('node-restful');
const mongoose = restful.mongoose;

const formSchema = new mongoose.Schema({
    ClinicID: {
        type: Schema.ObjectId,
        required: true
    },
    DentistID: {
        type: Schema.ObjectId,
        required: true
    },
    ClientID: {
        type: Schema.ObjectId,
        required: true,
        unique: true
    },
    DentalArch: {
        type: Schema.ObjectId,
        required: true,
        unique: true
    },
    Services: {
        type: Schema.ObjectId,
        required: true
    }
});

module.exports =restful.model('Form', formSchema)