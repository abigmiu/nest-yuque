import { Controller, Param, Query, Get, Body, Post, Put, UseGuards, Request } from '@nestjs/common';
import { Request as ERequest } from 'express';
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
        @Request() req: ERequest,
        @Query('page') page: string,
        @Query('size') size: string,
    ) {
        const { token } = req.cookies;
        return await this.docService.getDocs(token, +page, +size);
    }

    @ApiOperation({
        summary: '获取文档详情',
    })
    @Get(':slug')
    async getDocDetail(@Request() req: ERequest, @Param('slug') slug: string) {
        const { token } = req.cookies;
        return await this.docService.getDetail(token, slug);
    }

    @ApiOperation({
        summary: '提交文档',
    })
    @Post()
    async createDoc(@Request() req: ERequest, @Body() body: Record<string, any>) {
        const { token } = req.cookies;
        return await this.docService.createDoc(token, {
            title: body.title,
            body: body.content,
            format: 'html',
        });
    }

    @ApiOperation({
        summary: '更新文档',
    })
    @Put()
    async updateDoc(@Request() req: ERequest, @Body() body: Record<string, any>) {
        const { token } = req.cookies;
        return await this.docService.updateDoc(token, {
            title: body.title,
            body: body.content,
            format: 'html',
        });
    }
}
