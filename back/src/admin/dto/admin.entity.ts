import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id:string;

    @Column({nullable: false})
    login: string;

    @Column({nullable: false})
    password: string;


}