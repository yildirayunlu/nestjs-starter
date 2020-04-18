import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse as ApiUnauthorizedResponseBase } from '@nestjs/swagger';

export function ApiUnauthorizedResponse() {
  return applyDecorators(
    ApiUnauthorizedResponseBase({
      description: 'Unauthorized',
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: 401,
          },
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
        },
      },
    }),
  );
}
