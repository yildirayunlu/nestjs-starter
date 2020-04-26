export const HomeSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
  },
  required: ['status'],
};

export default HomeSchema;
