import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/types/user-login.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/types/roles.type';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto, role: Roles = 'user'): Promise<UserLogin> {
    const existUser: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })
    if (existUser) throw new BadRequestException('This email already exists')

    console.log({ createUserDto, role })

    const { id, email } = await this.userRepository.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, +process.env.SALT_OR_ROUNDS),
      roles: role
    })
    const token = await this.jwtService.signAsync({ id, email })
    return { id, email, token }
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } })
    return user
  }

  async findOneId(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async update(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const existUser: User = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if (!existUser) throw new BadRequestException('This user does not exist')

    existUser.email = updateUserDto.email
    existUser.roles = updateUserDto.role

    const { password, ...rest } = await this.userRepository.save(existUser)
    return { ...rest }
  }

  async updatePass(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const existUser: User = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if (!existUser) throw new BadRequestException('This user does not exist')

    existUser.password = await bcrypt.hash(updateUserDto.password, +process.env.SALT_OR_ROUNDS)
    const { password, ...rest } = await this.userRepository.save(existUser)
    return { ...rest }
  }

}
