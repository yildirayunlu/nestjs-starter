import { AuthenticatedUserSchema } from './User';

export const AuthenticatedSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    user: AuthenticatedUserSchema,
  },
  required: ['token', 'user'],
};

export default AuthenticatedSchema;
