import { SetMetadata } from '@nestjs/common';

export enum RoleMatchingMode {
  ALL = 'all',
  ANY = 'any',
}

export type RoleDecoratorOptions = {
  roles: string[];
  mode: RoleMatchingMode;
};

export const Roles = (roleMetaData: RoleDecoratorOptions) =>
  SetMetadata('roles', roleMetaData);
