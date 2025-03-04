import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { emailCheck } from 'src/core/helpers/email.regex';
import { passwordCheck } from 'src/core/helpers/password.regex';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    const user = await this.userService.findOne(loginDto.email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatched = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({ userId: user.id });

    const name = user.name;

    return { name, token };
  }

  async register(registerDto: RegisterDTO) {
    const user = await this.userService.findOne(registerDto.email);

    if (!emailCheck(registerDto.email)) {
      throw new HttpException('Not a valid email', HttpStatus.UNAUTHORIZED);
    }

    if (!passwordCheck(registerDto.password)) {
      throw new HttpException(
        'Password must be at least 8 characters, including letters and numbers',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const hashed = await bcrypt.hash(registerDto.password, 10);

    registerDto.password = hashed;

    const newUser = await this.userService.create(registerDto);

    const token = this.jwtService.sign({ userId: newUser.id });

    const name = newUser.name;

    return { name, token };
  }
}
