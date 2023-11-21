import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as crud from '../node/crud.js';

interface MyCustomError extends Error {
  message: string;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { method } = req;

  try {
    let result;

    if (method === 'POST') {
      result = await crud.create(req.body);
    } else if (method === 'PUT') {
      result = await crud.update(req.body.id, req.body);
    } else if (method === 'DELETE') {
      result = await crud.remove(req.body.id);
    } else if (method === 'GET') {
      result = await crud.getAll();
    } else {
      context.res = {
        status: 400,
        body: 'Método no admitido',
      };
      return;
    }

    context.res = {
      status: 200,
      body: result,
    };
  } catch (error) {
    const customError = error as MyCustomError;
    context.res = {
      status: 500,
      body: customError.message || 'Error interno del servidor',
    };
  }
};

export default httpTrigger;
