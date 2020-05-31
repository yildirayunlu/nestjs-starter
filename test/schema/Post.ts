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
  },
  required: ['id', 'title', 'content', 'user', 'comments'],
};

export default PostSchema;
