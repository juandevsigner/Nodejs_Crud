import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Endopoints docs for CRUD Api',
      version: '1.0.0',
      description: 'Api CRUD TS TypeORM',
    },
  },
  apis: ['./src/routes/*.routes.ts'],
};
