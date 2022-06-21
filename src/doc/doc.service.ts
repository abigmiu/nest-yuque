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
export class DocService {
    constructor(private appRedisService: AppRedisService) {}

    /** 分页获取文档 */
    async getDocs(token: string, page: number, size: number) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        const { repoId } = miuInfo;
        const data = await getDocsById(token, repoId, {
            offset: (page - 1) * size,
            limit: size,
        });
        return data;
    }

    /** 创建文档 */
    async createDoc(token: string, data: Record<string, any>) {
        const miuInfo: IMiu = await this.appRedisService.get(token);
        const { repoId } = miuInfo;
        return await createDoc(token, repoId, data);
    }
}
