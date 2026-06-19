import { Controller, Get, Param, Post, Query } from "@nestjs/common"
import { BookService } from "./book.service"
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(
        private readonly bookServise: BookService
    ){}


    @Get('books')
    getListBooks(
        @Query('autor') autor: string,
        @Query('age') age: string
    ){
        return this.bookServise.getBooksList()
    }

    @Get('book/:bookid')
    getListStreet(
        @Param('bookid') bookid: string,
    ){
        return this.bookServise.getBook()
    }

    //create admin
    @Post('book/:craete')
    bokkCreate(
        @Param('bookid') bookid: string,
    ){
        return this.bookServise.getBook()
    }

}