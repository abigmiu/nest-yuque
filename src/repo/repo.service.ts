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
export class RepoService {
    constructor(private appRedisService: AppRedisService) {}

    /** 获取 所有知识库 */
    async getRepos(token: string) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        const { userId } = miuInfo;
        const repos = await getReposById(token, userId);
        const list: Array<IReposRes> = [];
        repos.forEach((item) => {
            list.push({
                name: item.name,
                createdAt: item.created_at,
                description: item.description,
                bookId: item.id,
            });
        });
        return list;
    }

    /** 给用户绑定知识库 */
    async bindRepo(token: string, repoId: number) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        const newInfo = {
            ...miuInfo,
            repoId,
        };
        await this.appRedisService.set(token, newInfo);
        return 'success';
    }
}
