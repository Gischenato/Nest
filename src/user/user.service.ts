import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return 'Hello World!';
  }
}
