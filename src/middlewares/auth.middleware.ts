import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/constants';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( private readonly userService: UserService ) {
    }

    async use( req: ExpressRequestInterface, res: Response, next: NextFunction ) {
        const { authorization } = req.headers;
        if ( !authorization ) {
            req.user = null;
            next();
            return;
        }

        const token = authorization.split( ' ' )[ 1 ];

        try {
            const decode = verify( token, JWT_SECRET );

            req.user = await this.userService.findUserById( decode.id );
            next();
        } catch ( err ) {
            console.log(err)
            req.user = null;
            next();
        }
    }
}