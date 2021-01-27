import { SetMetadata } from '@nestjs/common';

export const PermissionsDecorator = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
