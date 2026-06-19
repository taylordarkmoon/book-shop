import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./dto/admin.entity";
import { Repository } from "typeorm";
import { JWTService } from "src/jwt/jwt.service";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminEntityRepository: Repository<AdminEntity>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private readonly smsService: SmsService,
     private readonly JWTservice: JWTService,
  ) {
    this.createAdmin()
  }
   async auth(login, password) {

    const admin = await this.adminEntityRepository.findOne({where: {login}});
    if (admin) {
      const token = await this.JWTservice.createAccessToken({
        ...admin,
        tokenCreationTime: new Date(),
      });

      return {admin, token};
    }
  }


  private async createAdmin(){
    const admin = await this.adminEntityRepository.save(this.adminEntityRepository.create({login: 'admin', password :'admin'}));
        return  admin
  }
}