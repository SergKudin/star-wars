
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get('rolesRequired', context.getHandler());
    if (!roles) {
      return true;
    }
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const correntUser = await this.userService.findOneId(user.id)

    return user && roles.some(role => correntUser.roles.includes(role))
  }

}

