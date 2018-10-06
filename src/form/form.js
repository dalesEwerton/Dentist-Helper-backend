const restful = require('node-restful');
const mongoose = restful.mongoose;

const formSchema = new mongoose.Schema({
    clinicID: {
        type: Schema.ObjectId,
        required: true
    },
    dentistID: {
        type: Schema.ObjectId,
         ref: 'Dentist',
        required: true
    },
    clientID: {
        type: Schema.ObjectId,
        ref: 'Client',
        required: true,
        unique: true
    },
    dentalArchID: {
        type: Schema.ObjectId,
        required: true,
        unique: true
    },
    services: [{
        type: Schema.ObjectId,
        required: true
    }]
});

module.exports =restful.model('Form', formSchema)