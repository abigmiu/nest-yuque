import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import type { IMiu } from 'src/models/yuque';
import { AppRedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private appRedisService: AppRedisService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { token } = request.headers;

        if (!token) {
            throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
        }
        const miuInfo: IMiu = await this.appRedisService.get(`${token}`);
        if (!miuInfo) {
            throw new HttpException('无此用户', HttpStatus.UNAUTHORIZED);
        }

        const notNeedRepoId = this.reflector.get<boolean>(
            'noRepoId',
            context.getHandler(),
        );
        if (!notNeedRepoId) {
            const { repoId } = miuInfo;
            if (!repoId) {
                throw new HttpException('未绑定知识库', 405);
            }
        }
        return true;
    }
}
