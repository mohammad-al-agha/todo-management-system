import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authservice.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authservice.register(registerDto);
  }
}
