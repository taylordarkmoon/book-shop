import { Body, Controller, Get, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AdminService } from "./admin.service"
import { Admin, BookCreate } from "./admin.dto"

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminServise: AdminService
    ){}


    @Post('/auth/login')
    auth(
        @Body() { login, password }: Admin
    ){
        return this.adminServise.auth(login, password)
    }

    //create admin
    @Post('book/create')
    bokkCreate(
        @Body() { title, description, year, quantity, author, price, photo}: BookCreate
        
    ){
        return this.adminServise.createBook( title, description, year, quantity, author, price, photo)
    }

}