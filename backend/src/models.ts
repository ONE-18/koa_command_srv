import { getEndpointSchema } from './types/Endpoint';
import { getUserSchema } from './types/User';
import { getScriptSchema } from './types/Scripts';

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
  SH = 'shell',
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

// const usuarioSchema = new mongoose.Schema({
//   name: String,
//   password: String,
//   email: String,
//   type: {
//     type: String,
//     enum: UserType,
//     required: true,
//   },
//   idiom: {
//     type: String,
//     enum: Idioms,
//     required: true,
//   },
// });

const usuarioSchema = getUserSchema();

const MUser = mongoose.model('User', usuarioSchema);

// const endpointSchema = new mongoose.Schema({
//   route: String,
//   petitionType: {
//     type: String,
//     enum: PetitionType,
//     required: true,
//   },
//   authentication: String,
// });
// const MEndpoint = mongoose.model('MEndpoint', endpointSchema);

const endpointSchema = getEndpointSchema();

const MEndpoint = mongoose.model('Endpoint', endpointSchema);

// const scriptSchema = new mongoose.Schema({
//   name: String,
//   code: String,
//   language: {
//     type: String,
//     enum: Language,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   endpointId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Endpoint',
//   },
// });
// const MScript = mongoose.model('MScript', scriptSchema);

const scriptSchema = getScriptSchema();

const MScript = mongoose.model('Script', scriptSchema);

export { MUser, MEndpoint, MScript, UserType, Language, PetitionType, Idioms };