import { IUser } from 'src/models/yuque';
import http from './request';

export function getUser(token: string): Promise<IUser> {
    return http.get(token, '/user');
}
