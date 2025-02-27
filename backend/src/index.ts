const mongoose = require('mongoose');

await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin')
.then(() => console.log('Conectado a MongoDB'))
.catch((err: string) => console.error('Error al conectar:', err));

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

async function insertar() {

    const user = new User({
        name: 'admin',
        password: 'admin',
        type: UserType.ADMIN
    });

    await user.save();

    const endpoint = new Endpoint({
        rute: '/api/v1',
        authentication: 'Bearer'
    });

    await endpoint.save();

    const script = new Script({
        name: 'script1',
        code: 'console.log("Hola mundo")',
        type: ScriptType.JS,
        userId: user._id,
        endpointId: endpoint._id
    });

    await script.save();

    const user2 = new User({
        name: 'user',
        password: 'user',
        type: UserType.USER
    });

    await user2.save();

    const script2 = new Script({
        name: 'script2',
        code: 'echo "Hola mundo"',
        type: ScriptType.SH,
        userId: user2._id,
        endpointId: endpoint._id
    });

    await script2.save();

    await consultar();

  }

// Ejecutar el seeding
insertar()
.catch((e) => {
    console.error('Error al insertar datos:', e);
    process.exit(1);
})
.finally(async () => {
    console.log('Datos insertados correctamente');
    await mongoose.disconnect();
});

async function consultar() {
    await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err: string) => console.error('Error al conectar:', err));

    const users = await User.find();
    console.log('Usuarios:', users);

    const endpoints = await Endpoint.find();
    console.log('Endpoints:', endpoints);

    const scripts = await Script.find();
    console.log('Scripts:', scripts);

}

