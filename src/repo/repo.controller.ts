import {
    Controller,
    Get,
    Headers,
    Post,
    Param,
    UseGuards,
    Request,
    SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { RepoService } from './repo.service';

@UseGuards(AuthGuard)
@ApiTags('知识库')
@Controller('repo')
export class RepoController {
    constructor(private readonly repoService: RepoService) {}

    @ApiOperation({
        summary: '获取知识库列表',
    })
    @Get('list')
    async getRepoList(@Request() req: Record<string, any>) {
        const data = await this.repoService.getRepos(req.headers.token);
        return data;
    }

    @ApiOperation({
        summary: '绑定知识库',
    })
    @SetMetadata('noRepoId', true)
    @Post(':repoId')
    async bindRepo(
        @Request() req: Record<string, any>,
        @Param('repoId') repoId?: string,
    ) {
        return await this.repoService.bindRepo(req.headers.token, +repoId);
    }
}
