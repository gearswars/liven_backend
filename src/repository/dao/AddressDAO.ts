import {DataSource} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {Address} from "../entity/Address";

export class AddressDAO {

    private addressRepository: Repository<Address>;

    constructor(private dataSource: DataSource) {
        this.addressRepository = dataSource.getRepository(Address);
    }

    async create() {
    }

    async read() {

    }

    async update() {

    }

    async delete() {

    }
}