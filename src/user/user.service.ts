import { Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
    constructor(private appRedisService: AppRedisService) {}

    async setUser(id: string) {
        const res = await this.appRedisService.set(id, true);
        return res;
    }
}
