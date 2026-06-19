import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksEntity } from "./dto/book.entity";
import { BookController } from "./book.contriller";
import { BookService } from "./book.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([
        BooksEntity,

      ]),
    //    HttpModule,
    ],
    providers: [BookService],
    controllers: [BookController],
  })
  export class BookModule {}