import { SetMetadata } from '@nestjs/common';

export enum RoleMatchingMode {
  ALL = 'all',
  ANY = 'any',
}

export interface RoleDecoratorOptionsInterface {
  roles: string[];
  /**
   * Role matching mode, defaults to {@link RoleMatchingMode.ANY}
   */
  mode: RoleMatchingMode;
}

/**
 * Keycloak user roles.
 * @param roleMetaData - meta data for roles and matching mode
 * @since 1.1.0
 */
export const Roles = (roleMetaData: RoleDecoratorOptionsInterface) =>
  SetMetadata('roles', roleMetaData);
