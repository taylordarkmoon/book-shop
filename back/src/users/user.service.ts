import { HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './dao/user.entity';
import { Repository } from 'typeorm';
// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { SmsService } from 'src/common/sms-manager';
import { JWTService } from 'src/jwt/jwt.service';
import { transformUser } from './transformer';
// import { UpdateUserDto } from './dto/users.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private readonly smsService: SmsService,
    private readonly JWTservice: JWTService,
  ) {
    this.createUser()
  }

   async auth( username, password ) {

    const user = await this.userEntityRepository.findOne({where: {name: username}});
    if (user) {
      const token = await this.JWTservice.createAccessToken({
        ...transformUser(user),
        tokenCreationTime: new Date(),
      });

      return {user, token};
    }
  }

  async loginUser(phone, name , email, password) {

      const user: UserEntity = await this.userEntityRepository.save(
        this.userEntityRepository.create({ phone, name , email, hash_password: password }), 
      );
      const token = await this.JWTservice.createAccessToken({
        ...transformUser(user),
        tokenCreationTime: new Date(),
      });
      return { user: transformUser(user), token };
    }
 

  private async createUser(){
    const user = await this.userEntityRepository.save(this.userEntityRepository.create({
      name: 'vika',
      phone: "345678",
      email: "bsfhbesi@ijf.com",
      hash_password: "heorjgbeirgjb"

     }));
        return  user
  }

}
