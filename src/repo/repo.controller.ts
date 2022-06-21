import { Controller, Get, Headers, Post, Param } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller('repo')
export class RepoController {
    constructor(private readonly repoService: RepoService) {}

    @Get('list')
    async getRepoList(@Headers('token') token: string) {
        const data = await this.repoService.getRepos(token);
        return data;
    }

    @Post(':repoId')
    async bindRepo(
        @Headers('token') token: string,
        @Param('repoId') repoId?: string,
    ) {
        return await this.repoService.bindRepo(token, +repoId);
    }
}
