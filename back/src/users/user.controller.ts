import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './dto/users.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/jwt/guard.service';
import { JWTPayload } from 'src/jwt/jwt.decorator';
import { LoginUser, TokenModel } from './transformer';

@ApiTags('user auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  auth(@Body() { username, password }: User) {
    return this.userService.auth(username, password);
  }

  @Post('/login')
  login(@Body() { phone, name , email, password }: LoginUser) {
    return this.userService.loginUser(phone, name , email, password);
  }

}
