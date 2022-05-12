import {Request, Response, Router} from 'express';
import {userLoginInterface} from "../interface";
import {StatusCodes} from "http-status-codes";

import UserDAO from "../repository/dao/UserDAO";
import JwtUtils from "../util/JwtUtils";
import {getPath} from "../util/PathUtils";

const {UNAUTHORIZED, OK, NO_CONTENT} = StatusCodes;

const {doSign} = new JwtUtils();

export default class UserController {

    private path = '/user';
    private router = Router();

    private userDAO: UserDAO;

    constructor(private repository: UserDAO) {
        this.userDAO = repository;

        this.initializeRoutes();
    }

    public initializeRoutes() {
        console.log('initializeRoutes');
        this.router.get(getPath(this.path, `/login`), this.login);
        this.router.get(getPath(this.path, '/:id'), this.readOne);
        this.router.put(getPath(this.path, ''), this.update);
    }

    private login = async (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "*");

        const userLogin: userLoginInterface = req.body
        const logged: boolean = await this.userDAO.login(userLogin);

        const token: string = doSign({});

        res.status(logged ? OK : UNAUTHORIZED);
        if (logged) res.json({token});
        res.send();
    }

    private readOne = async (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "*");

        const {id} = req.params
        const user = await this.userDAO.readOne(Number.parseInt(id));

        res.status(user ? OK : NO_CONTENT).send(user);
    }

    private update = async (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "*");

        const user = await this.userDAO.update(req.body);

        res.send(user);
    }

};