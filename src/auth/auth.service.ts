import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/types/user-login.type';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email)
    console.log(pass)
    console.log(user.email)
    console.log(user.password)

    const passIsMatch = await bcrypt.compare(pass, user.password)
    if (user && passIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Email or password are incorrect')
  }

  async login(loginDto: LoginDto): Promise<UserLogin> {
    const user: User = await this.validateUser(loginDto.email, loginDto.password)
    const { id, email } = user
    const token = await this.jwtService.signAsync({ id, email })
    return { id, email, token }
  }

}
