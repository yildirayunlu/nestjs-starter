import { UserSchema } from './User';

export const CommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    comment: { type: 'string' },
    user: UserSchema,
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'comment', 'user', 'createdAt', 'updatedAt'],
};

export default CommentSchema;
