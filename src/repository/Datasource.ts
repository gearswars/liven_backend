import 'reflect-metadata'
import {DataSource} from 'typeorm'
import {ProcessEnvInterface, properties} from "../util/ProcessEnvParse";
import {User} from "./entity/User";
import {Address} from "./entity/Address";
import {AdminCreationMigration1652584335062} from "./migration/AdminCreationMigration";
import {CreateUser1652580010833} from "./migration/CreateUser";
import {CreateAddress1652584275517} from "./migration/CreateAddress";

const {type, host, port, username, password, database}: ProcessEnvInterface = properties

const dataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    logging: true,
    entities: [Address, User],
    subscribers: [],
    migrations: [
        CreateUser1652580010833,
        CreateAddress1652584275517,
        AdminCreationMigration1652584335062
    ],
    migrationsTableName: "migrations"
});

export function createConnection() {
    return dataSource;
}

export default (async () => await dataSource.initialize())()