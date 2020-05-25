interface PayloadSchema {
  type: string;
  properties: object;
  required?: string[];
}

export const paginated = (schema: PayloadSchema) => ({
  type: 'object',
  properties: {
    data: { ...schema, type: 'array' },
    count: { type: 'number' },
    total: { type: 'number' },
    page: { type: 'number' },
    pageCount: { type: 'number' },
  },
  required: ['data', 'count', 'total', 'page', 'pageCount'],
});

export default paginated;
