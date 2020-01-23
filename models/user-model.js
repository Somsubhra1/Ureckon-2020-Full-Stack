const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema({
    name: {
            type: String,
            required: true,
            max: 100
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    Role: {
        type: schema.Types.ObjectId,
        // required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;