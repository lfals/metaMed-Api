import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      date: new Date(),
      status: 'up and running',
    };
  }
}
