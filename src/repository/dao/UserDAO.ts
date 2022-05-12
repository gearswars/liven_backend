import {DataSource} from "typeorm";
import {User} from "../entity/User";
import {Repository} from "typeorm/repository/Repository";

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
                    ]
                }
            );
    }

    async readOne(id: number) {
        return await this.userRepository
            .findOne({
                    relations: {
                        addresses: true
                    },
                    where: {id},
                    select: [
                        'id',
                        'name',
                        'surname',
                        'login',
                        'addresses'
                    ]
                }
            );
    }

    async update(user: User) {
        return await this.userRepository.update({id: user.id}, user);
    }

    async delete(id: number) {
        return await this.userRepository.delete({id});
    }

}