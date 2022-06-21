import { Controller, Get, Headers, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepoService } from './repo.service';

@ApiTags('知识库')
@Controller('repo')
export class RepoController {
    constructor(private readonly repoService: RepoService) {}

    @ApiOperation({
        summary: '获取知识库列表',
    })
    @Get('list')
    async getRepoList(@Headers('token') token: string) {
        const data = await this.repoService.getRepos(token);
        return data;
    }

    @ApiOperation({
        summary: '绑定知识库',
    })
    @Post(':repoId')
    async bindRepo(
        @Headers('token') token: string,
        @Param('repoId') repoId?: string,
    ) {
        return await this.repoService.bindRepo(token, +repoId);
    }
}
