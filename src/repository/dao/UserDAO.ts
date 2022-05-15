import {DataSource, DeleteResult, UpdateResult} from "typeorm";
import {User} from "../entity/User";
import {Repository} from "typeorm/repository/Repository";
import {userLoginInterface} from "../../interface";

export default class UserDAO {

    private userRepository: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    async create(user: User) {
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
        return await this.userRepository.delete({id});
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return await this.userRepository.update({id}, {active: false});
    }

    async login({login, password}: userLoginInterface): Promise<boolean> {
        const count: number = await this.userRepository.count({
                where: {
                    login: login ? login : '',
                    password: password ? password : ''
                },
                relations: {
                    addresses: false
                }
            }
        );

        return count !== 0;
    }

}