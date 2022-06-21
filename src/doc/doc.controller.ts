import {
    Controller,
    Param,
    Query,
    Get,
    Body,
    Post,
    Put,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { DocService } from './doc.service';

@UseGuards(AuthGuard)
@ApiTags('文档')
@Controller('doc')
export class DocController {
    constructor(private readonly docService: DocService) {}

    @ApiOperation({
        summary: '获取文档分页',
    })
    @Get('list')
    async getDocList(
        @Request() req: Record<string, any>,
        @Query('page') page: string,
        @Query('size') size: string,
    ) {
        return await this.docService.getDocs(req.headers.token, +page, +size);
    }

    @ApiOperation({
        summary: '获取文档详情',
    })
    @Get(':slug')
    async getDocDetail(
        @Request() req: Record<string, any>,
        @Param('slug') slug: string,
    ) {
        return await this.docService.getDetail(req.headers.token, slug);
    }

    @ApiOperation({
        summary: '提交文档',
    })
    @Post()
    async createDoc(
        @Request() req: Record<string, any>,
        @Body() body: Record<string, any>,
    ) {
        return await this.docService.createDoc(req.headers.token, body);
    }

    @ApiOperation({
        summary: '更新文档',
    })
    @Put()
    async updateDoc(
        @Request() req: Record<string, any>,
        @Body() body: Record<string, any>,
    ) {
        return await this.docService.updateDoc(req.headers.token, body);
    }
}
