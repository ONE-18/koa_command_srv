# API Dinámica con Panel de Administración

Esta apliación permite gestionar y configurar endpoints de una API desde un panel accesible en `/admin`, sin modificar el código base. Esto permite administrar las rutas y sus acciones dinámicamente.

El panel de administración permite relacionar cada dirección con un script.

Toda petición a la API necesita el uso de de un token de seguridad, excepto `/admin`, que utiliza usuario y contraseña.

Un mismo endpoint puede desencadenar distintas acciones dependiendo del tipo de petición realizada.