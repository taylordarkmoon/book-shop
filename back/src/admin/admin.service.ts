import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./dto/admin.entity";
import { Repository } from "typeorm";
import { JWTService } from "src/jwt/jwt.service";
import { BooksEntity } from "src/books/dto/book.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminEntityRepository: Repository<AdminEntity>,
    @InjectRepository(BooksEntity)
    private readonly bookEntityRepository: Repository<BooksEntity>,
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

    async createBook( title, description, year, quantity, author, price, photo){

        const newBook = await this.bookEntityRepository.save(this.bookEntityRepository.create({
            title,
            descroption:description,
            age:year,
            author,
            price,
            cover: photo,
            count: quantity,
            list_count: 560,
            izdatek: "AST",
            rating: 4
        }))

        return newBook

    }


  private async createAdmin(){
    const admin = await this.adminEntityRepository.save(this.adminEntityRepository.create({login: 'admin', password :'admin'}));
        return  admin
  }
}