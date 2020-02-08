import {
  ValidationPipe,
  ArgumentMetadata,
  NotAcceptableException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class FormValidationPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      const errors = {};
      error.message.message.map((validationError: ValidationError) => {
        errors[validationError.property] = Object.values(
          validationError.constraints,
        );
      });
      throw new NotAcceptableException({
        statusCode: 406,
        message: 'ValidationError',
        errors,
      });
    }
  }
}
