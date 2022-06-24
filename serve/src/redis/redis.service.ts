import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AppRedisService {
    private client: Redis;

    constructor(private redisService: RedisService) {
        this.getClient();
    }

    async getClient() {
        this.client = await this.redisService.getClient();
    }

    async set(key: string, value: any) {
        value = JSON.stringify(value);
        if (!this.client) {
            await this.getClient();
        }
        try {
            return await this.client.set(`yuque-id-${key}`, value);
        } catch {
            throw new HttpException('redis 写入失败', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async get(key: string) {
        if (!this.client) {
            await this.getClient();
        }
        const data = await this.client.get(`yuque-id-${key}`);
        if (!data) {
            return null;
        }

        return JSON.parse(data);
    }
}
