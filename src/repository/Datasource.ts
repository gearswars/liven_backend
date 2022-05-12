import 'reflect-metadata'
import {DataSource} from 'typeorm'
import {ProcessEnvInterface, properties} from "../util/DataSourceParse";
import {User} from "./entity/User";
import {Address} from "./entity/Address";

const {type, host, port, username, password, database}: ProcessEnvInterface = properties

export function createConnection() {
    return new DataSource({
        type,
        host,
        port,
        username,
        password,
        database,
        synchronize: true,
        logging: true,
        entities: [Address, User],
        subscribers: [],
        migrations: [],
    })
}