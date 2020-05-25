import { AdminUserSchema } from './User';
import { AdminCommentSchema } from './Comment';

export const AdminPostSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    user: AdminUserSchema,
    comments: { ...AdminCommentSchema, type: 'array' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'title', 'content', 'user', 'createdAt', 'updatedAt'],
};

export default AdminPostSchema;
