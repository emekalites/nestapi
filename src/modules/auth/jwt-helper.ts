import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

interface User {
  sub: number;
  email: string;
}

@Injectable()
export class JWTHelper {
  constructor(private configService: ConfigService) {}

  async createToken(user: User) {
    const secretKey = this.configService.get<string>('JWT_TOKEN');
    const expiresIn = this.configService.get<string>('JWT_TTL');

    const token = jwt.sign(user, secretKey, { expiresIn });

    return { expires_in: expiresIn, token };
  }
}
