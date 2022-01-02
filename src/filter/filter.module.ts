import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterEntity } from "@app/entity/filter.entity";
import { FilterController } from "@app/filter/filter.controller";
import { FilterService } from "@app/filter/filter.service";

@Module( {
        imports: [ TypeOrmModule.forFeature( [ FilterEntity ] ) ],
        controllers: [ FilterController ],
        providers: [ FilterService ],
        exports: []
    }
)
export class FilterModule {
}