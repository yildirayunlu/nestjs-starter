export const UserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['firstName', 'lastName'],
};

export default UserSchema;
