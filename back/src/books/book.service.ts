import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksEntity } from "./dto/book.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookService {
    @InjectRepository(BooksEntity)
    private readonly userEntityRepository: Repository<BooksEntity>

   async getBooksList(age, autor, price, title){

     const  books = await this.userEntityRepository
    .createQueryBuilder('book')
    .getMany()

    return books;

    }

   async getBook(bookId){

        const  book = await this.userEntityRepository
        .createQueryBuilder('book')
        .where('book.id = :bookId', {bookId})
        .getOne()
    
        return book;
    }

}