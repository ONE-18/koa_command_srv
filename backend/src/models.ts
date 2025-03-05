const mongoose = require('mongoose');

enum Idioms {
  ES = 'es',
  EN = 'en',
}

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
  email: String,
  type: {
    type: String,
    enum: UserType,
    required: true,
  },
  idiom: {
    type: String,
    enum: Idioms,
    required: true,
  },
});
usuarioSchema.path('idiom').default(Idioms.ES);

const MUser = mongoose.model('MUser', usuarioSchema);

const endpointSchema = new mongoose.Schema({
  rute: String,
  petitionType: {
    type: String,
    enum: PetitionType,
    required: true,
  },
  authentication: String,
});

const MEndpoint = mongoose.model('MEndpoint', endpointSchema);

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

const MScript = mongoose.model('MScript', scriptSchema);

export { MUser, MEndpoint, MScript, UserType, Language, PetitionType, Idioms };