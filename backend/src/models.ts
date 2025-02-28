const mongoose = require('mongoose');

enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

 enum Language {
  SH = 'sh',
  JS = 'js',
}

 enum PetitionType {
  GET = 'GET',
  HEAD = 'HEAD',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
}

const usuarioSchema = new mongoose.Schema({
  name: String,
  password: String,
  type: {
    type: String,
    enum: UserType,
    required: true,
  },
});

 const User = mongoose.model('User', usuarioSchema);

const endpointSchema = new mongoose.Schema({
  rute: String,
  petitionType: {
    type: String,
    enum: PetitionType,
    required: true,
  },
  authentication: String,
});

 const Endpoint = mongoose.model('Endpoint', endpointSchema);

const scriptSchema = new mongoose.Schema({
  name: String,
  code: String,
  language: {
    type: String,
    enum: Language,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  endpointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endpoint',
  },
});

 const Script = mongoose.model('Script', scriptSchema);

export { User, Endpoint, Script, UserType, Language, PetitionType };