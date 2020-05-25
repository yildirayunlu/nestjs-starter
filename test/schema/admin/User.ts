export const AdminUserSchema = {
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
};

export default AdminUserSchema;
