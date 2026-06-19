import { AdminEntity } from "./admin/dto/admin.entity";
import { BooksEntity } from "./books/dto/book.entity";
import { UserEntity } from "./users/dao/user.entity";

export const dbEntity = [
    BooksEntity, 
    UserEntity,
    AdminEntity
]