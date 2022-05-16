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

    @Column({nullable: true})
    address?: string

    @Column({nullable: true})
    street?: string

    @Column({nullable: true})
    city?: string

    @Column({nullable: true})
    state?: string

    @Column({nullable: true})
    country?: string

    @ManyToOne(() => User, (user) => user.addresses, {nullable: false, cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user?: User;

}