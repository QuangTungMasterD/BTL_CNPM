import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    return await this.authService.validateUser(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  check(@Req() req) {
    return req.user;
  }
}
