import {hash, compare} from 'bcrypt';

const saltRounds = 10;

export async function crypt(password): Promise<string> {
    return await hash(password, saltRounds);
}

export async function verify(password, passwordDB): Promise<boolean> {
    return await compare(password, passwordDB);
}

