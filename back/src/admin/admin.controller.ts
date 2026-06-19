import { Body, Controller, Get, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AdminService } from "./admin.service"
import { Admin } from "./admin.dto"

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
    ){

    }

}