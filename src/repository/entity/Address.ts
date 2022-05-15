import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity('address')
export class Address {

    constructor(address?: string, street?: string, city?: string, state?: string, country?: string, user?: User) {
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.user = user;
    }

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

    @ManyToOne(() => User, (user) => user.addresses, {cascade: true, onUpdate: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user?: User;

}