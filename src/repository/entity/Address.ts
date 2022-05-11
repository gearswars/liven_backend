import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string

    @ManyToOne(() => User, (user) => user.address)
    user: User

}