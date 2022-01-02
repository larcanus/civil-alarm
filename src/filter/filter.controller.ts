import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { FilterService } from "@app/filter/filter.service";
import { AuthGuard } from "@app/guards/auth.guard";
import { User } from "@app/decorators/user.decorator";
import { UserEntity } from "@app/entity/user.entity";
import { CreateFilterDto } from "@app/filter/dto/createFilter.dto";

@Controller( 'filters' )
export class FilterController {
    constructor( private readonly filterService: FilterService ) {
    }

    @Post()
    @UseGuards( AuthGuard )
    async createFilter( @User() currentUser: UserEntity, @Body( 'filter' ) createFilterDto: CreateFilterDto ): Promise<any> {
        return this.filterService.createFilter( currentUser, createFilterDto );
    }
}