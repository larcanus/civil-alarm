import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { FilterService } from "@app/filter/filter.service";
import { AuthGuard } from "@app/guards/auth.guard";
import { User } from "@app/decorators/user.decorator";
import { UserEntity } from "@app/entity/user.entity";
import { FilterDto } from "@app/filter/dto/filter.dto";
import { FilterEntity } from "@app/entity/filter.entity";

@Controller( 'filters' )
export class FilterController {
    constructor( private readonly filterService: FilterService ) {
    }

    @Put()
    @UseGuards( AuthGuard )
    async createOrUpdateFilter( @User() currentUser: UserEntity, @Body( 'filters' ) filterDto: FilterDto ): Promise<FilterEntity> {
        const currentFilter = await this.filterService.findFilterByUserId( currentUser.id );
        if ( currentFilter ) {
            return this.filterService.updateFilter( currentFilter, filterDto );
        } else {
            return this.filterService.createFilter( currentUser, filterDto );
        }
    }
}