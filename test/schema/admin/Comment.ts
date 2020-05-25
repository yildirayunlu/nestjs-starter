import { AdminUserSchema } from './User';

export const AdminCommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    comment: { type: 'string' },
    user: AdminUserSchema,
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'comment', 'user', 'createdAt', 'updatedAt'],
};

export default AdminCommentSchema;
