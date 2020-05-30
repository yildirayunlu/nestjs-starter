import { AdminUserSchema } from './User';

export const AdminPostSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    user: AdminUserSchema,
    comments: {
      type: 'array',
      properties: {
        id: { type: 'number' },
        comment: { type: 'string' },
        user: AdminUserSchema,
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['id', 'comment', 'user', 'createdAt', 'updatedAt'],
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'title', 'content', 'user', 'createdAt', 'updatedAt'],
};

export default AdminPostSchema;
