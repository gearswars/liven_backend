import {JwtPayload, sign, verify} from 'jsonwebtoken';

import {ProcessEnvInterface, properties} from "./ProcessEnvParse";

const {secret}: ProcessEnvInterface = properties;

export default class JwtUtils {

    public doSign(payload: string | Buffer | object): string {
        const days = JwtUtils.getDays(7);
        return sign(payload, secret, {
            expiresIn: days // expires in 7 days
        });
    }

    public doVerify(token: string): JwtPayload | string {
        return verify(token, secret);
    }

    private static getDays(days: number) {
        return days * 60 * 60 * 24;
    }

    private static getHours(hour: number) {
        return hour * 60 * 60;
    }

    private static getMinutes(minute: number) {
        return minute * 60;
    }
}