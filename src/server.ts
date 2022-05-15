import {DataSource} from "typeorm";

import AddressController from "./controller/AddressController";
import {AddressDAO} from "./repository/dao/AddressDAO";
import App from './app';
import {createConnection} from "./repository/Datasource";
import UserController from "./controller/UserController";
import UserDAO from "./repository/dao/UserDAO";

const {port = 3000} = process.env;

const connection = createConnection();

async function start() {
    const dataSource: DataSource = await connection.initialize();
    await dataSource.runMigrations();

    const app = new App([
            new AddressController(new AddressDAO(dataSource)),
            new UserController(new UserDAO(dataSource))
        ],
        port
    );
    app.listen();
}

start().then();