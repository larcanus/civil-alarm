import { Controller, Get, UseGuards, } from '@nestjs/common';
import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guard';
import { NoticeService } from "@app/notice/notice.service";
import { NoticeEntity } from "@app/entity/notice.entity";

@Controller()
export class NoticeController {
    constructor( private readonly noticeService: NoticeService ) {
    }

    @Get( 'notice' )
    @UseGuards( AuthGuard )
    async getCurrentUser( @User( 'id' ) userId: number ): Promise<NoticeEntity[]> {
        return this.noticeService.getNoticeByUserId( userId );
    }
}