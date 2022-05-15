import {Request, Response, Router} from 'express';
import {userLoginInterface} from "../interface";
import {StatusCodes} from "http-status-codes";

import UserDAO from "../repository/dao/UserDAO";
import JwtUtils from "../util/JwtUtils";
import {getPath} from "../util/PathUtils";

const {CONFLICT, UNAUTHORIZED, NOT_MODIFIED, OK, NO_CONTENT} = StatusCodes;

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
        this.router.post(getPath(this.path, ''), this.create);
        this.router.get(getPath(this.path, ''), this.readAll);
        this.router.get(getPath(this.path, '/:id'), this.readOne);
        this.router.put(getPath(this.path, ''), this.update);
        this.router.delete(getPath(this.path, '/:id'), this.delete);
        this.router.post(getPath(this.path, `/login`), this.login);
    }

    private create = async (req: Request, res: Response) => {
        try {
            const user = await this.userDAO.create(req.body);

            res.status(OK).json(user).end();
        } catch (e) {
            res.status(CONFLICT).end();
        }
    }

    private readAll = async (req: Request, res: Response) => {
        const users = await this.userDAO.readAll();

        res.status(!!users && users.length != 0 ? OK : NO_CONTENT).send(users);
    }

    private readOne = async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await this.userDAO.readOne(Number.parseInt(id));

        res.status(!!user ? OK : NO_CONTENT).json(user).end();
    }

    private update = async (req: Request, res: Response) => {
        const user = await this.userDAO.update(req.body);

        res.send(user);
    }

    private delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {affected} = await this.userDAO.delete(Number.parseInt(id));

        res.status(affected != 0 ? OK : NOT_MODIFIED).end();
    }

    private login = async (req: Request, res: Response) => {
        const userLogin: userLoginInterface = req.body
        const logged: boolean = await this.userDAO.login(userLogin);
        const token: string = doSign({login: userLogin.login});

        res.status(logged ? OK : UNAUTHORIZED).json(logged ? {token} : undefined).end();
    }

};