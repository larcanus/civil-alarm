import { Injectable } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

@Injectable()
export class CreateFilterDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    filter:string;
}
