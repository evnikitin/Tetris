import { INestApplication } from '@nestjs/common';

export class AppContext {
  private static instance: INestApplication;

  static setInstance(instance: INestApplication) {
    AppContext.instance = instance;
  }

  static get<T = any>(type: any): T {
    return AppContext.instance.get(type);
  }
}
