import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "./Address";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    surname?: string

    @Column()
    login?: string

    @Column()
    password?: string

    @OneToMany(() => Address, (address) => address.user, {cascade: true})
    addresses?: Address[]

}