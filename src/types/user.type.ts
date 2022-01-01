import { UserEntity } from '@app/entity/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>
export type UserTypeLoginResponse = Omit<UserEntity, 'hashPassword' | 'password'>