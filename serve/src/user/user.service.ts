import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';
import { getUser } from 'src/helpers/yuque/yuque';
import type { IUser } from 'src/models/yuque';

@Injectable()
export class UserService {
    constructor(private appRedisService: AppRedisService) {}

    async setUser(token: string) {
        const isBind = await this.appRedisService.get(token);
        if (isBind) {
            throw new HttpException('token 已被绑定', HttpStatus.BAD_REQUEST);
        }

        let userInfo: IUser;
        try {
            userInfo = await getUser(token);
        } catch {
            throw new HttpException('token 绑定失败，请重试', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            const { id, name, avatar_url } = userInfo;
            const res = await this.appRedisService.set(token, {
                userId: id,
                userName: name,
                avatar: avatar_url,
            });
            return res;
        } catch {
            throw new HttpException('token 写入失败， 请重试', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
