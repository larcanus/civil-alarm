import { Module } from '@nestjs/common';
import { ScheduleModule } from "@nestjs/schedule";
import { NoticeService } from "@app/notice/notice.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterEntity } from "@app/entity/filter.entity";
import { NoticeEntity } from "@app/entity/notice.entity";

@Module( {
    imports: [ HttpModule,ScheduleModule.forRoot(),TypeOrmModule.forFeature( [ FilterEntity, NoticeEntity ] ) ],
    controllers: [],
    providers: [ NoticeService ],
} )

export class NoticeModule {}