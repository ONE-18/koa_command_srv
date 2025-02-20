import Koa from "koa";
import Router from "@koa/router";
import { exec } from "child_process";
import fs from "fs";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();
const router = new Router();
const execPromise = util.promisify(exec);

const PORT = process.env.PORT || 5000;
const COMMANDS_PATH = process.env.COMMANDS_PATH || "commands.json";

// Carga el diccionario desde un archivo JSON
function loadCommands(): Record<string, string> {
    try {
        // Intentar copiar el contenido del enlace simbólico antes de leer el archivo real
        try {
            const linkContent = fs.readFileSync(`${COMMANDS_PATH}.lnk`, "utf8");
            fs.writeFileSync(COMMANDS_PATH, linkContent);
        } catch (error) {
            console.error(`Error cargando ${COMMANDS_PATH}.lnk: ${error}`);
        }

        const data = fs.readFileSync(COMMANDS_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error cargando ${COMMANDS_PATH}: ${error}`);
        return {};
    }
}

// Ruta para "/"
router.get("/", async (ctx) => {
    ctx.body = {
        message: "Bienvenido al servicio",
        status: "OK",
    };
});

// Manejo de rutas no encontradas
app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.body = {
            error: "Endpoint no encontrado",
            status: 404,
        };
    }
});

// Ruta dinámica para ejecutar comandos
router.get("/:key", async (ctx) => {
    const commands = loadCommands();
    const key = ctx.params.key;
    const command = commands[key];

    if (command) {
        try {
            const { stdout } = await execPromise(command);
            ctx.body = { key, command, output: stdout };
        } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: `Error ejecutando el comando '${command}'`, details: error.stderr || error.message };
        }
    } else {
        ctx.status = 404;
        ctx.body = { error: "Clave no encontrada en el diccionario" };
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`Servidor Koa corriendo en http://0.0.0.0:${PORT}`);
});
