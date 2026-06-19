import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JWTService } from './jwt.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const httpContext = ctx.switchToHttp();
    const req = httpContext.getRequest<Request>();
    //const response = httpContext.getResponse<Response>();
    const header = req.headers['authorization'];
    if (!header) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authorization error.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userFromAccessToken =
      await this.jwtService.validateAccessToken(header);

    if (!userFromAccessToken) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Authorization error.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // const userFromRefreshToken =
    // await this.jwtService.validateRefreshToken(header);
    const reqrrr = ctx.switchToHttp().getRequest<Request>();
    reqrrr['payload'] = userFromAccessToken;

    return true;
  }
}
