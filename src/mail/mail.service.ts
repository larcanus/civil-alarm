import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "@app/user/dto/createUser.dto";
const nodemailer = require( 'nodemailer' );

@Injectable()
export class MailService {
    private readonly config: {
        pass: string;
        address: string;
    };

    constructor() {
        this.config = {
            address: 'civilalarm@yandex.com',
            pass: 'Civilalarm1090'
        }
    }

    async createTransporter() {
        return await nodemailer.createTransport( {
            service: 'Yandex',
            auth: {
                user: this.config.address,
                pass: this.config.pass,
            },
        } );
    }

    async sentMailCreatingUser( receiver: CreateUserDto ): Promise<void> {
        const transporter = await this.createTransporter();

        const { fillHtml } = require( './templates/reg' )
        const templateRegister = fillHtml( {
            name: receiver.name || 'Anonymous',
            email: receiver.email || '****@****',
            password: receiver.password || '*********'
        } )
        const sendingInfo = await transporter.sendMail( {
            from: `CivilAlarm <${ this.config.address }>`,
            to: receiver.email,
            subject: `Спасибо за регистрацию`,
            html: templateRegister
        } );

        console.log( 'Message sent: %s', sendingInfo ); // TODO create and save into log
    }
}
