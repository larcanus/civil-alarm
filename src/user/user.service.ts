import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/constants';
import { UserResponseInterface, UserTypeLoginResponseInterface } from '@app/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { compare, hash } from 'bcryptjs';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository( UserEntity )
        private readonly usersRepository: Repository<UserEntity> ) {
    }

    async createUserData( createUserDto: CreateUserDto ): Promise<UserEntity> {
        const userByEmail = await this.usersRepository.findOne( { email: createUserDto.email } );
        const userByName = await this.usersRepository.findOne( { name: createUserDto.name } );
        if ( userByEmail || userByName ) {
            throw new HttpException( 'Name or Email are already', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        const user = new UserEntity();
        Object.assign( user, createUserDto );
        return await this.usersRepository.save( user );
    }

    async loginUser( loginUserDto: LoginUserDto ): Promise<UserEntity> {
        const user = await this.usersRepository.findOne( { email: loginUserDto.email } );
        if ( !user ) {
            throw new HttpException( 'User is not find', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        const isPasswordCorrect = await this.decodePassword( loginUserDto.password, user.password );
        if ( !isPasswordCorrect ) {
            throw new HttpException( 'Password is not validate', HttpStatus.UNPROCESSABLE_ENTITY );
        }
        return user;
    }

    async updateUser( userId: number, updateUserDto: UpdateUserDto ): Promise<UserEntity> {
        const currentUser = await this.findUserById( userId );
        Object.assign( currentUser, updateUserDto );
        if ( updateUserDto.password ) {
            currentUser.password = await hash( updateUserDto.password, 10 );
        }
        return await this.usersRepository.save( currentUser );
    }

    findUserById( id: number ): Promise<UserEntity> {
        return this.usersRepository.findOne( id );
    }

    async decodePassword( loginPassword: string, DBPassword: string ): Promise<boolean> {
        return await compare( loginPassword, DBPassword );
    }

    buildUserResponse( user: UserEntity ): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.createJWToken( user )
            }
        };
    }

    loginUserResponse( user: UserEntity ): UserTypeLoginResponseInterface {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                filters: user.filters,
                token: this.createJWToken( user )
            }
        };
    }

    createJWToken( user: UserEntity ): string {
        return sign( {
                id: user.id,
                name: user.name,
                email: user.email
            },
            JWT_SECRET
        );
    }
}