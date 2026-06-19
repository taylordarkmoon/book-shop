export class Admin {
    login: string
    password: string
}

export class BookCreate {
    title :string
    description: string
    year:string | number
    author:string
    price : string | number
    photo : string
    quantity : string | number
}