import App from './app';
import UserController from "./controller/UserController";
import {createConnection} from "./repository/Datasource";
import {DataSource} from "typeorm";
import UserDAO from "./repository/dao/UserDAO";

const {port = 3000} = process.env;

const connection = createConnection();

async function start() {
    const dataSource: DataSource = await connection.initialize();

    const app = new App([
            new UserController(new UserDAO(dataSource)),
        ],
        port
    );
    app.listen();
}

start().then();