import {DataSource, DeleteResult} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {Address} from "../entity/Address";
import {User} from "../entity/User";

export class AddressDAO {

    private addressRepository: Repository<Address>;
    private userRepository: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.addressRepository = dataSource.getRepository(Address);
        this.userRepository = dataSource.getRepository(User);
    }

    async create(login: string, address: Address): Promise<any> {
        return await this.dataSource.query(
            'INSERT INTO address (address, street, city, state, country, id_user) VALUES (?, ?, ?, ?, ?, ?)',
            [
                address.address,
                address.street,
                address.city,
                address.state,
                address.country,
                await this.getUserIdByLogin(login)
            ]
        );
    }

    async readAll(): Promise<Address[]> {
        return await this.addressRepository.find();
    }

    async readByUserId(userId: number): Promise<Address[]> {
        return await this.addressRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        })
    }

    async update(address: Address) {
        return await this.dataSource.query(
            'UPDATE address SET address = ?, street = ?, city = ?, state = ?, country = ? WHERE id = ?',
            [
                address.address,
                address.street,
                address.city,
                address.state,
                address.country,
                address.id
            ]
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.addressRepository.delete({id});
    }

    private async getUserIdByLogin(login: string): Promise<number> {
        const {id} = await this.userRepository.findOne({
            select: ['id'],
            relations: {
                addresses: false
            },
            where: {
                login
            }
        });
        return id;
    }
}