import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '@app/entity/log.entity';

@Global()
@Module( {
    imports: [ TypeOrmModule.forFeature( [ LogEntity ] ) ],
    providers: [ LogService ],
    exports: [ LogService ]
} )
export class LogModule {
}
