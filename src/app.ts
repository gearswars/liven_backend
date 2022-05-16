import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {StatusCodes} from "http-status-codes";
import {JsonWebTokenError} from 'jsonwebtoken';
import {serve, setup} from 'swagger-ui-express';

import JwtUtils from "./util/JwtUtils";
import {deepCompare} from "./util/ObjectUtils";

const swaggerJson = require('../swagger.json');

const {doVerify} = new JwtUtils();

const {SERVICE_UNAVAILABLE, PROXY_AUTHENTICATION_REQUIRED} = StatusCodes;

export default class App {

    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use('/doc', serve, setup(swaggerJson));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            if (this.getUrlWithoutAuth(req)) {
                next();
            } else {
                try {
                    doVerify(req.header('Authorization'));
                    next();
                } catch (e) {
                    res.status(e instanceof JsonWebTokenError ? PROXY_AUTHENTICATION_REQUIRED : SERVICE_UNAVAILABLE).end()
                }
            }
        });
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => this.app.use('', controller.router));
    }

    private getUrlWithoutAuth(req: Request) {
        const list = [
            {
                url: '/',
                method: 'GET'
            },
            {
                url: '/user/login',
                method: 'POST'
            },
            {
                url: '/user',
                method: 'POST'
            },
            {
                url: '/doc',
                method: 'GET'
            },
        ];
        return list.find(item => deepCompare(item, {
            method: req.method,
            url: req.url
        }));
    }
};

