import {Request, Response, Router} from 'express';
import {StatusCodes} from "http-status-codes";
import {getPath} from "../util/PathUtils";
import {AddressDAO} from "../repository/dao/AddressDAO";
import JwtUtils from "../util/JwtUtils";
import {JwtPayload} from "jsonwebtoken";

const {CONFLICT, NOT_MODIFIED, OK, NO_CONTENT, NOT_ACCEPTABLE} = StatusCodes;
const {doVerify} = new JwtUtils();

export default class AddressController {

    public router = Router();
    private path = '/address';
    private addressDAO: AddressDAO;

    constructor(private repository: AddressDAO) {
        this.addressDAO = repository;

        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(getPath(this.path, ''), this.create);
        this.router.get(getPath(this.path, ''), this.readAll);
        this.router.get(getPath(this.path, '/:userId'), this.readOne);
        this.router.put(getPath(this.path, ''), this.update);
        this.router.delete(getPath(this.path, '/:id'), this.delete);
    }

    private create = async (req: Request, res: Response) => {
        try {
            const tokenBody = doVerify(req.header('Authorization'));
            if (this.instanceOfJwtPayload(tokenBody)) {
                console.log(tokenBody);
                const user = await this.addressDAO.create(tokenBody.login, req.body);

                res.status(OK).json(user).end();
            } else {
                res.status(NOT_ACCEPTABLE).end()
            }
        } catch (e) {
            res.status(CONFLICT).end();
        }
    }

    private readAll = async (req: Request, res: Response) => {
        const addresses = await this.addressDAO.readAll();

        res.status(!!addresses && addresses.length != 0 ? OK : NO_CONTENT).json(addresses).end();
    }

    private readOne = async (req: Request, res: Response) => {
        const {userId} = req.params;
        const addresses = await this.addressDAO.readByUserId(Number.parseInt(userId));

        res.status(!!addresses ? OK : NO_CONTENT).send(addresses);
    }

    private update = async (req: Request, res: Response) => {
        const user = await this.addressDAO.update(req.body);

        res.send(user);
    }

    private delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {affected} = await this.addressDAO.delete(Number.parseInt(id));

        res.status(affected != 0 ? OK : NOT_MODIFIED).send();
    }

    private instanceOfJwtPayload(object: any): object is JwtPayload {
        return 'login' in object;
    }


};