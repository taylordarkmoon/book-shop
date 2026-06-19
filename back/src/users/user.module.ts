// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserEntity } from './dao/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserController } from './user.controller';
import { JWTService } from 'src/jwt/jwt.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
  ]), 
  // HttpModule
],
  providers: [UserService, JWTService],
  controllers: [UserController],
})
export class UserModule {}
