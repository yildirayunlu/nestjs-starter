import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    // TODO: Refactor find .env file path
    let filePath = '.env';
    let folder = '../../';

    if (process.env.NODE_ENV === 'test') {
      filePath = '.env.test';
      folder = '../../';
    }
    const envFile = path.resolve(__dirname, folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
