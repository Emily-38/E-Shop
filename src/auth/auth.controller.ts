
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.signup.dto';
import { SigninDto } from './dto/auth.signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }
  @Patch('/validate/:token')
  validateAccount(@Param('token') token: string) {
    return this.authService.validateAccount(token);
  }
}

