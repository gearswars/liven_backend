type typeType = 'mysql' | 'mariadb';
type portType = number;

export const properties: ProcessEnvInterface = {
    type: <typeType>process.env.TYPE,
    host: process.env.HOST,
    port: <portType><unknown>process.env.PORT,
    username: process.env.LOGIN,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    secret: process.env.SECRET
}

export interface ProcessEnvInterface {
    type?: typeType;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    secret?: string;
}