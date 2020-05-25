import { AdminUserSchema } from './admin';

export const AuthSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    user: AdminUserSchema,
  },
  required: ['token', 'user'],
};

export default AuthSchema;
