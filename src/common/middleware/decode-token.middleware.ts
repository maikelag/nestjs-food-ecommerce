import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../../security/services';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  constructor(private userServices: UserService) {}

  async use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
    } else {
      const decodeToken: any = await this.validateToken(
        req.headers.authorization,
      );
      req['user'] = await this.userServices.findUserByTokenData(
        decodeToken.user,
      );
    }
    next();
  }

  async validateToken(auth: string | any) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
      return verify(token, process.env.SECRET || 'AVOCADO');
    } catch (error) {
      const message = 'Token error: ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
