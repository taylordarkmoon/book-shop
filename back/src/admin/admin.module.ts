import { Module } from "@nestjs/common";
import { AdminEntity } from "./dto/admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { JWTService } from "src/jwt/jwt.service";

@Module({
    imports: [TypeOrmModule.forFeature([
      AdminEntity,
    ]), 
    // HttpModule
  ],
    providers: [AdminService, JWTService],
    controllers: [AdminController],
  })
  export class AdminModule {}
  