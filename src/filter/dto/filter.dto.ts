import { Injectable } from "@nestjs/common";

@Injectable()
export class FilterDto {
    readonly name_1: string;
    readonly filter_1: string;
    readonly active_1: string;
    readonly name_2: string;
    readonly filter_2: string;
    readonly active_2: string;
}
