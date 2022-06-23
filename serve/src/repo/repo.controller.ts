import {
    Controller,
    Get,
    Res,
    Request,
    Post,
    Param,
    UseGuards,
    SetMetadata,
} from '@nestjs/common';
import { Response, Request as ERequest } from 'express';
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
    @SetMetadata('noRepoId', true)
    @Get('list')
    async getRepoList(@Request() req: ERequest) {
        const { token } = req.cookies;
        const data = await this.repoService.getRepos(token);
        return data;
    }

    @ApiOperation({
        summary: '绑定知识库',
    })
    @SetMetadata('noRepoId', true)
    @Post(':repoId')
    async bindRepo(
        @Request() req: Record<string, any>,
        @Param('repoId') repoId: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const res = await this.repoService.bindRepo(req.headers.token, +repoId);
        response.cookie('bindRepo', true, {
            httpOnly: true,
            maxAge: 2147483647,
        });
        return res;
    }
}
