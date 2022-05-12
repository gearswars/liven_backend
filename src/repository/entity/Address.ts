import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address?: string

    @Column()
    street?: string

    @Column()
    city?: string

    @Column()
    state?: string

    @Column()
    country?: string

    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn({name: 'id_user'})
    user: User;

}