interface PayloadSchema {
  type: string;
  properties: object;
  required?: string[];
}

export const paginatedAdmin = (schema: PayloadSchema) => ({
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

export const paginated = (schema: PayloadSchema) => ({
  type: 'object',
  properties: {
    data: { ...schema, type: 'array' },
    pagination: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        itemCount: { type: 'number' },
        itemsPerPage: { type: ['number', 'string'] },
        totalPages: { type: 'number' },
        currentPage: { type: ['number', 'string'] },
      },
      required: [
        'totalItems',
        'itemCount',
        'itemsPerPage',
        'totalPages',
        'currentPage',
      ],
    },
  },
  required: ['data', 'pagination'],
});
