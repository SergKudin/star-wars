import { Controller, Post, Body, UseGuards, HttpStatus, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserLogin } from 'src/types/user-login.type';
import { LoginDto } from './dto/login.dto';
import { SkipAuth } from './decorators/skip-auth.decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @SkipAuth()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "Login a User" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiBody({
    schema: {
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      }
    }
  })
  async login(@Body() user: LoginDto): Promise<UserLogin> {
    return await this.authService.login(user)
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get User Profile' })
  getProfile(@Request() req) {
    return req.user
  }
}
