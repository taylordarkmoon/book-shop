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
  ) {}

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

  // async verification(code) {


  //   if (!phone) {
  //     throw new HttpException(
  //       {
  //         ststus: HttpStatus.NOT_FOUND,
  //         error: 'Invalid code',
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   if (phone) {
  //     const checkUser = await this.userEntityRepository.findOne({
  //       where: { phone },
  //     });
  //     if (checkUser) {
  //       const token = await this.JWTservice.createAccessToken({
  //         ...transformUser(checkUser),
  //         tokenCreationTime: new Date(),
  //       });

  //       return {
  //          user: transformUser(checkUser),
  //          token , 
  //          status: checkUser.user_agreement_version == agreement.version?  AgreementStatus.userExistAgreementNoChange : AgreementStatus.userExistAgreementChange };
  //     }
  //     const user: UserEntity = await this.userEntityRepository.save(
  //       this.userEntityRepository.create({ phone }), 
  //     );
  //     const token = await this.JWTservice.createAccessToken({
  //       ...transformUser(user),
  //       tokenCreationTime: new Date(),
  //     });
  //     return { user: transformUser(user), token ,  status : AgreementStatus.newUser };
  //   }
  // }



}
