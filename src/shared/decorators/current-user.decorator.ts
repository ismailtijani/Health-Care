import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(data);
    console.log(request.user);
    return data ? request.user && request.user[data] : request.user;
  },
);
