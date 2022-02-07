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
import { MailService } from "@app/mail/mail.service";
import { LogService } from "@app/log/log.service";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository( UserEntity )
        private readonly usersRepository: Repository<UserEntity>,
        private readonly mailService: MailService,
        private readonly logService: LogService ) {
    }

    async createUserData( createUserDto: CreateUserDto ): Promise<UserEntity> {
        const userByEmail = await this.usersRepository.findOne( { email: createUserDto.email } );
        const userByName = await this.usersRepository.findOne( { name: createUserDto.name } );
        if ( userByEmail || userByName ) {
            throw new HttpException( 'Имя или email уже используется', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        const user = new UserEntity();
        Object.assign( user, createUserDto );
        const saveResult = await this.usersRepository.save( user );

        try {
            await this.mailService.sentMailCreatingUser( createUserDto );
            await this.logService.putLog( { userId: user.id, record: `CREATE USER :: ${ user.name }` } );
        } catch ( er ) {
            await this.logService.putLog( { userId: user.id, record: `CREATE USER ERROR SEND MAIL :: ${ er }` } );
        }

        return saveResult;
    }

    async loginUser( loginUserDto: LoginUserDto ): Promise<UserEntity> {
        const user = await this.usersRepository.findOne( { email: loginUserDto.email }, { relations: [ 'filters' ] } );
        if ( !user ) {
            throw new HttpException( 'Такого пользователя не существует', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        const isPasswordCorrect = await this.decodePassword( loginUserDto.password, user.password );
        if ( !isPasswordCorrect ) {
            throw new HttpException( 'Пароль введен неверно', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        return user;
    }

    async updateUser( userId: number, updateUserDto: UpdateUserDto ): Promise<UserEntity> {
        const currentUser = await this.findUserById( userId );
        const oldDataUser = Object.assign( new UserEntity(), currentUser );

        Object.assign( currentUser, updateUserDto );
        if ( updateUserDto.password ) {
            currentUser.password = await hash( updateUserDto.password, 10 );
        }
        const saveResult = await this.usersRepository.save( currentUser );

        try {
            if ( oldDataUser.name !== updateUserDto.name ||
                oldDataUser.email !== updateUserDto.email ||
                updateUserDto.password ) {
                await this.mailService.sentMailUpdatingUser( oldDataUser, updateUserDto );
                await this.logService.putLog( { userId, record: `UPDATE USER :: ${ currentUser.name }` } );

            }
        } catch ( er ) {
            await this.logService.putLog( { userId, record: `UPDATE USER ERROR SEND MAIL :: ${ er }` } );
        }

        return saveResult;
    }

    findUserById( id: number ): Promise<UserEntity> {
        return this.usersRepository.findOne( id, { relations: [ 'filters' ] } );
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
                notices: user.notices,
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