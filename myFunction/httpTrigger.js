// Importar el módulo de logging
const { logger } = require('azure-functions-core-tools');

module.exports = async function (context, req) {
    // Acceder a la variable de entorno
    const myCustomVariable = process.env.MyCustomVariable;

    // Imprimir el valor en los logs
    logger.info(`Valor de MyCustomVaale: ${myCustomVariable}`);

    // Responder a la solicitud HTTP
    context.res = {
        body: "¡Función ejecutada con éxito!"
    };
};
