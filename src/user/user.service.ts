import { Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';
import {
    getUser,
    getReposById,
    getDocsById,
    createDoc,
} from 'src/helpers/yuque/yuque';
import type { IMiu, IRepo } from 'src/models/yuque';
import type { IReposRes } from 'src/models/repos';

@Injectable()
export class UserService {
    constructor(private appRedisService: AppRedisService) {}

    async setUser(token: string) {
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
