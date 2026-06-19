import { Controller, Get, Param, Post, Query } from "@nestjs/common"
import { BookService } from "./book.service"
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(
        private readonly bookServise: BookService
    ){}


    @Get('')
    getListBooks(
        @Query('autor') autor: string,
        @Query('age') age: string,
        @Query('price') price: string,
        @Query('title') title: string,
    ){
        return this.bookServise.getBooksList(age, autor, price, title)
    }

    @Get('/:bookid')
    getListStreet(
        @Param('bookid') bookid: string,
    ){
        return this.bookServise.getBook(bookid)
    }

    //create admin
    @Post('book/:craete')
    bokkCreate(
        @Param('bookid') bookid: string,
    ){
        return this.bookServise.getBook(bookid)
    }

}