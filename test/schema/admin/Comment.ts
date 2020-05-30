import { AdminUserSchema } from './User';

export const AdminCommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    comment: { type: 'string' },
    user: AdminUserSchema,
    post: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'comment', 'user', 'post', 'createdAt', 'updatedAt'],
};

export default AdminCommentSchema;
