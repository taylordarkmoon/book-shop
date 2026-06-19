import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

@Injectable()
export class JWTService {
  constructor(private readonly configService: ConfigService) {}

  public async createAccessToken(meta: any) {
    const accessOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '20d',
    };
    const accessToken: string = sign(
      meta,
      this.configService.get('JWT_ACCESS_SECRET'),
      accessOptions,
    );

    return accessToken;
  }

  public async validateAccessToken(
    token: string,
  ): Promise<string | JwtPayload> {
    const nnn = token.split(' ')[1] ?? undefined;
    try {
      const { payload } = verify(
        nnn,
        this.configService.get('JWT_ACCESS_SECRET'),
        {
          complete: true,
        },
      );

      return payload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async createRefreshToken(meta: any) {
    const refreshOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '30d',
    };
    const refreshToken: string = sign(
      meta,
      this.configService.get('JWT_REFRESH_SECRET'),
      refreshOptions,
    );

    return refreshToken;
  }

  public async validateRefreshToken(
    token: string,
  ): Promise<string | JwtPayload> {
    const nnn = '';
    // const nnn = token.split(' ')[1] ?? undefined;
    try {
      const { payload } = verify(
        nnn,
        this.configService.get('JWT_REFRESH_SECRET'),
        {
          complete: true,
        },
      );

      return payload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
