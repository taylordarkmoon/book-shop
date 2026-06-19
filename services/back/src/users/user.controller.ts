import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './dto/users.dto';
import { UserService } from './user.service';
// import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/jwt/guard.service';
import { JWTPayload } from 'src/jwt/jwt.decorator';
import { TokenModel } from './transformer';

// @ApiTags('user')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  auth(@Body() { username, password }: User) {
    return this.userService.auth(username, password);
  }

  // @Post('/login')
  // login(@Body() { code }: VeryifyCode) {
  //   return this.userService.verification(code);
  // }

}
