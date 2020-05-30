import { UserSchema } from './User';
import { CommentSchema } from './Comment';

export const PostSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    user: UserSchema,
    comments: { ...CommentSchema, type: 'array' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: [
    'id',
    'title',
    'content',
    'user',
    'comments',
    'createdAt',
    'updatedAt',
  ],
};

export default PostSchema;
