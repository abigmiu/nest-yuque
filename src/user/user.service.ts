import { Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';
import { getUser } from 'src/helpers/yuque/yuque';

@Injectable()
export class UserService {
    constructor(private appRedisService: AppRedisService) {}

    async setUser(token: string) {
        console.log('fetchUser');

        const userInfo = await getUser(token);

        const { id, name, avatar_url } = userInfo;
        const res = await this.appRedisService.set(token, {
            userId: id,
            userName: name,
            avatar: avatar_url,
        });
        return res;
    }
}
