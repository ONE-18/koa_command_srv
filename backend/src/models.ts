const mongoose = require('mongoose');

enum UserType {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

enum ScriptType {
    SH = 'sh',
    JS = 'js',
}

const usuarioSchema = new mongoose.Schema({
    name: String,
    password: String,
    type: {
        type: String,
        enum: UserType,
        required: true
    }
});

const User = mongoose.model('User', usuarioSchema);

const endpointSchema = new mongoose.Schema({
    rute: String,
    authentication: String
});

const Endpoint = mongoose.model('Endpoint', endpointSchema);

const scriptSchema = new mongoose.Schema({
    name: String,
    code: String,
    type: {
        type: String,
        enum: ScriptType,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    endpointId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endpoint'
    }
});

const Script = mongoose.model('Script', scriptSchema);

module.exports = { User, Endpoint, Script, UserType, ScriptType };
