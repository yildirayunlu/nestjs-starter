import { matchers } from 'jest-json-schema';

// jest json schema
expect.extend(matchers);

jest.setTimeout(10000);
