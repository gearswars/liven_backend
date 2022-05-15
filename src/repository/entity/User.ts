import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "./Address";

@Entity('user')
export class User {

    constructor(name?: string, surname?: string, login?: string, password?: string) {
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    surname?: string;

    @Column({unique: true, nullable: false})
    login?: string;

    @Column()
    password?: string;

    @Column({default: true})
    active?: boolean;

    @OneToMany(() => Address, (address) => address.user)
    addresses?: Address[];

}