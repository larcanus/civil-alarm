import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

  if (!req.user) {
    return null;
  }
  if (data) {
    return req[data];
  }
  return req.user;
});
