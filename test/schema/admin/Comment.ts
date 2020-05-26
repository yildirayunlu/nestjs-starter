export const AdminCommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    comment: { type: 'string' },
    user: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        roles: { type: 'array' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: [
        'id',
        'firstName',
        'lastName',
        'email',
        'roles',
        'createdAt',
        'updatedAt',
      ],
    },
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
  required: ['id', 'comment', 'user', 'createdAt', 'updatedAt'],
};

export default AdminCommentSchema;
