import {DataSource, DeleteResult, UpdateResult} from "typeorm";

import {User} from "../entity/User";
import {Repository} from "typeorm/repository/Repository";
import {userLoginInterface} from "../../interface";
import {Address} from "../entity/Address";
import {crypt, verify} from "../../util/PasswordUtils";

export default class UserDAO {

    private addressRepository: Repository<Address>;
    private userRepository: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.addressRepository = dataSource.getRepository(Address);
        this.userRepository = dataSource.getRepository(User);
    }

    async create(user: User) {
        user.password = await crypt(user.password);
        return await this.userRepository.save(user);
    }

    async readAll() {
        return await this.userRepository
            .find({
                    relations: {
                        addresses: true
                    },
                    select: [
                        'id',
                        'name',
                        'surname',
                        'login',
                        'addresses'
                    ],
                    where: {
                        active: true
                    }
                }
            );
    }

    async readOne(id: number) {
        return await this.userRepository
            .findOne({
                    relations: {
                        addresses: true
                    },
                    select: [
                        'id',
                        'name',
                        'surname',
                        'login',
                        'addresses'
                    ],
                    where: {
                        id,
                        active: true
                    }
                }
            );
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update({id: user.id}, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.addressRepository.query('DELETE FROM address WHERE id_user = ?', [id]);
        return await this.userRepository.delete({id});
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return await this.userRepository.update({id}, {active: false});
    }

    async login({login, password}: userLoginInterface): Promise<boolean> {
        const user: User = await this.userRepository.findOne({
                select: {
                    password: true
                },
                where: {
                    login: login ? login : ''
                },
                relations: {
                    addresses: false
                }
            }
        );
        return await verify(password, user.password);
    }

}