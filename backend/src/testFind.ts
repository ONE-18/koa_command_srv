import Database from "./utils/database";
// import mongoose from "mongoose";
import { /*MEndpoint, MScript, MUser*/ } from "./models";
// import { authContrl } from "./controllers/authContrl";

const db = new Database();
await db.connect();

// const userID = '67cea13acf66804756194197';
// console.log('id', userID);

// const all = await MScript.find();
// console.log('all', all);

// const ret = await MScript.find({ userID: new mongoose.Types.ObjectId(userID)}).exec();
// let ret = await MScript.find({ userId: new mongoose.Types.ObjectId(userID)}).exec();
// console.log('ret', ret);

// const forc = await MScript.find({ userId: all[0]["userId"]}).exec();
// console.log('for', forc);

// const users = await MUser.find();
// console.log('users', users);

// const user = await MUser.find({ _id: new mongoose.Types.ObjectId(userID)}).exec();
// console.log('user', user);

// const adm = await MUser.findOne({ name: "admin" }).exec();

// if (adm) {
//     const inp = adm._id.toString(); // Convertir _id a string
//     console.log('Admin ID:', inp);
    
//     const admScr = await MScript.find({ userId: inp }).exec();
//     console.log('Admin scripts:', admScr);
// }else{
//     console.log("No se encontró el usuario admin");
// }

// const inp = "script1";
// console.log('const nam:', inp);

// ret = await MScript.find({ name: inp}).exec();
// console.log('ret', ret);

// const all = await MEndpoint.find();
// console.log('all', all);

// const userID = await authContrl.getUserID('token_seguro');
// const scripts = await Database.getUserScripts('67d02606ea45da231ef8eec4');
// console.log('scripts', scripts);
// const endpoints: typeof MEndpoint[] = [];
// for (const script of await scripts) {
//     const scriptEndpoints = await MEndpoint.find({ _id: script.endpointId }).exec();
//     scriptEndpoints.forEach((endpoint: typeof MEndpoint) => {
//         if (!endpoints.some(e => e._id.equals(endpoint._id))) {
//             endpoints.push(endpoint);
//         }
//     });
// }
// console.log('unique endpoints', endpoints);

const userID = "67d02606ea45da231ef8eec4";
console.log('userID', userID);
const script = await Database.getUserScriptById(userID, "67d02606ea45da231ef8eec8");
console.log(script);

process.exit(0);