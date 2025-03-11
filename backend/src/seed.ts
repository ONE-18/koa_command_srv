const { MUser, MEndpoint, MScript, UserType, Language, PetitionType, Idioms} = require('./models');

async function insertaciones() {

    await MUser.deleteMany({}); // Borra todos los documentos de la colección Usuarios
    await MEndpoint.deleteMany({}); // Borra todos los documentos de la colección Endpoints
    await MScript.deleteMany({}); // Borra todos los documentos de la colección Scripts

    console.log('Todos los usuarios han sido eliminados');
  
    const user = new MUser({
        name: 'admin',
        // password: 'admin',
        // email: 'mail@test.com',
        password: '1',
        email: '1',
        type: UserType.ADMIN
    });

    await user.save();
    
    const script = new MScript({
        name: 'script1',
        code: 'console.log("Hola mundo")',
        language: Language.JS,
        userId: user._id,
    });

    await script.save();

    const endpoint = new MEndpoint({
        route: '/api/v1',
        petitionType: PetitionType.GET,
        authentication: 'Bearer',
        scriptId: script._id,
        // status: true,
    });

    await endpoint.save();

    const user2 = new MUser({
        name: 'user',
        password: 'user',
        email: 'test2@test.com',
        type: UserType.USER,
        idiom: Idioms.ES,
    });

    await user2.save();

    const script2 = new MScript({
        name: 'script2',
        code: 'echo "Hola mundo"',
        language: Language.SH,
        userId: user._id,
    });

    await script2.save();

}

async function insertar() {
    await insertaciones()
    .catch((e: string) => {
        console.error('Error al insertar datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Datos insertados correctamente');
    });
}

async function consultaciones() {
    const users = await MUser.find();
    console.log('Usuarios:', users);

    const endpoints = await MEndpoint.find();
    console.log('Endpoints:', endpoints);

    const scripts = await MScript.find();
    console.log('Scripts:', scripts);
}

async function consultar() {
    await consultaciones()
    .catch((e: string) => {
        console.error('Error al consultar datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Datos consultados correctamente');
    });
}

export { insertar, consultar };
