import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppRedisService } from 'src/redis/redis.service';
import { getReposById, getRepoDetail } from 'src/helpers/yuque/yuque';
import type { IMiu } from 'src/models/yuque';
import type { IReposRes } from 'src/models/repos';

@Injectable()
export class RepoService {
    constructor(private appRedisService: AppRedisService) {}

    /** 获取 所有知识库 */
    async getRepos(token: string) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        console.log(miuInfo);

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

    async getRepoDetail(token: string, repoId: number) {
        try {
            console.log(token, repoId);

            await getRepoDetail(token, repoId);
        } catch (e) {
            console.log(e);
            throw new HttpException('无法绑定该知识库', 500);
        }
    }

    /** 给用户绑定知识库 */
    async bindRepo(token: string, repoId: number) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        if (miuInfo.repoId) {
            throw new HttpException('已绑定知识库', HttpStatus.BAD_REQUEST);
        }

        try {
            await this.getRepoDetail(token, repoId);
        } catch {
            throw new HttpException('无法获取知识库详情', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const newInfo = {
            ...miuInfo,
            repoId,
        };

        await this.appRedisService.set(token, newInfo);
        return 'ok';
    }
}
