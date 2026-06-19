import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenModel } from 'src/users/transformer';

export const JWTPayload = createParamDecorator(
  (data: string[] = [], ctx: ExecutionContext) => {
    const { payload = {} } = ctx.switchToHttp().getRequest();
    if (data.length !== 0) {
      return data.reduce((params: Partial<TokenModel>, key: string) => {
        params[key] = payload[key];

        return params;
      }, {});
    }
    return payload;
  },
);
