import { SetMetadata } from '@nestjs/common';

export const Roles = (...rolesRequired: string[]) => SetMetadata('rolesRequired', rolesRequired);
