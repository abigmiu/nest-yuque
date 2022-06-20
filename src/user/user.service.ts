import { Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';
import { getUser } from 'src/helpers/yuque/yuque';

@Injectable()
export class UserService {
    constructor(private appRedisService: AppRedisService) {}

    async setUser(token: string) {
        const userInfo = await getUser(token);
        console.log(userInfo);
        const res = await this.appRedisService.set(token, userInfo);
        return res;
    }
}
