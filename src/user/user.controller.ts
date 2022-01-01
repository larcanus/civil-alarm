import { Controller, Post, Body, ValidationPipe, UsePipes, Get, Req, UseGuards, Put } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface, UserTypeLoginResponseInterface } from '@app/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UserEntity } from '@app/entity/user.entity';
import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guard';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';

@Controller()
export class UserController {
    constructor( private readonly userService: UserService ) {
    }

    @Post( '/users' )
    @UsePipes( new ValidationPipe() )
    async createUserData( @Body( 'user' ) createUserDto: CreateUserDto ): Promise<UserResponseInterface> {
        const user = await this.userService.createUserData( createUserDto );
        return this.userService.buildUserResponse( user );
    }

    @Post( '/users/login' )
    @UsePipes( new ValidationPipe() )
    async loginUser( @Body( 'user' ) loginUserDto: LoginUserDto ): Promise<UserTypeLoginResponseInterface> {
        const user = await this.userService.loginUser( loginUserDto );
        return this.userService.loginUserResponse( user );
    }

    @Get( 'user' )
    @UseGuards( AuthGuard )
    async getCurrentUser( @User() user: UserEntity ): Promise<UserTypeLoginResponseInterface> {
        return this.userService.loginUserResponse( user );
    }

    @Put( 'user' )
    @UseGuards( AuthGuard )
    async updateCurrentUser( @User( 'id' ) userId: number, @Body( 'user' ) updateUserDto: UpdateUserDto ): Promise<any> {
        const user = await this.userService.updateUser( userId, updateUserDto );
        return this.userService.loginUserResponse( user );
    }
}