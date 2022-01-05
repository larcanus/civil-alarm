import { Injectable } from "@nestjs/common";
import { UserEntity } from "@app/entity/user.entity";
import { FilterDto } from "@app/filter/dto/filter.dto";
import { FilterEntity } from "@app/entity/filter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository( FilterEntity ) private readonly filterRepository: Repository<FilterEntity> ) {
    }

    async updateFilter( currentFilter: FilterEntity, newFilter: FilterDto ): Promise<FilterEntity> {
        Object.assign( currentFilter, newFilter );
        return await this.filterRepository.save( currentFilter );
    }

    async createFilter( currentUser: UserEntity, filterDto: FilterDto ): Promise<FilterEntity> {
        const filter = new FilterEntity();
        Object.assign( filter, filterDto );
        filter.user = currentUser;
        return await this.filterRepository.save( filter );
    }

    async findFilterByUserId( userId: string ): Promise<FilterEntity | null> {
        const filter = await this.filterRepository.findOne( { where: { user: userId } } );
        if ( filter && filter.id ) {
            return filter;
        } else {
            return null;
        }
    }
}