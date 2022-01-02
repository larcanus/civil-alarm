import { Injectable } from "@nestjs/common";
import { UserEntity } from "@app/entity/user.entity";
import { CreateFilterDto } from "@app/filter/dto/createFilter.dto";
import { FilterEntity } from "@app/entity/filter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository( FilterEntity ) private readonly filterRepository: Repository<FilterEntity> ) {
    }

    async createFilter( currentUser: UserEntity, createFilterDto: CreateFilterDto ): Promise<FilterEntity> {
        const filter = new FilterEntity();
        Object.assign( filter, createFilterDto );

        filter.user = currentUser;
        return await this.filterRepository.save(filter);
    }
}