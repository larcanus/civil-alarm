import { UserType, UserTypeLoginResponse } from '@app/types/user.type';

export interface UserResponseInterface {
    user: UserType & { token: string }
}

export interface UserTypeLoginResponseInterface {
    user: UserTypeLoginResponse & { token: string }
}