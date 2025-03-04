import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';
import { AuthRequest } from '../types/auth.request.type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  use = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const splitted = authorization.split(' ');

    if (splitted.length < 2 || splitted[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = splitted[1];

    try {
      const data = await this.jwtService.verify(token);

      const user = await this.userService.findById(data.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req['user'] = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
