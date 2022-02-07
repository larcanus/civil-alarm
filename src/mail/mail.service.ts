import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { UserEntity } from '@app/entity/user.entity';
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
        } );
        const sendingInfo = await transporter.sendMail( {
            from: `CivilAlarm <${ this.config.address }>`,
            to: receiver.email,
            subject: `Спасибо за регистрацию`,
            html: templateRegister
        } );

        console.log( 'Message sent: %s', sendingInfo ); // TODO create and save into log
    }

    async sentMailUpdatingUser( receiver: UserEntity, updateData: UpdateUserDto ): Promise<void> {
        const transporter = await this.createTransporter();
        const { fillHtml } = require( './templates/update' );

        const templateUpdate = fillHtml( {
            name: updateData.name || 'Не изменён',
            email: updateData.email || 'Не изменён',
            password: updateData.password || 'Не изменён'
        } );
        const sendingInfo = await transporter.sendMail( {
            from: `CivilAlarm <${ this.config.address }>`,
            to: receiver.email,
            subject: `Смена данных`,
            html: templateUpdate
        } );

        console.log( 'Message sent: %s', sendingInfo ); // TODO create and save into log
    }

    async sentMailNoticeUser( receiver: string, filter: string, documents: any ): Promise<void> {
        const transporter = await this.createTransporter();
        const { fillHtml } = require( './templates/notice' );
        const templateNotice = fillHtml( filter, documents );

        const sendingInfo = await transporter.sendMail( {
            from: `CivilAlarm <${ this.config.address }>`,
            to: receiver,
            subject: `Получены результаты`,
            html: templateNotice
        } );

        console.log( 'Message sent: %s', sendingInfo ); // TODO create and save into log
    }
}
