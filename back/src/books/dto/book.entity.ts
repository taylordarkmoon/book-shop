import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class BooksEntity {
    @PrimaryGeneratedColumn()
    id:string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    descroption: string;

    @Column({nullable: false})
    age: number;

    @Column({nullable: false})
    autor: number;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    list_count: number;

    @Column({nullable: false})
    izdatek: string;

    @Column({nullable: false})
    count: number;

}
//book card many to many