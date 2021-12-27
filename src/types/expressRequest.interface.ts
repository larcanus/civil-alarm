import {Request} from "express";
import { UserEntity } from "@app/entity/user.entity";

export interface ExpressRequestInterface extends Request {
    user? : UserEntity,
}