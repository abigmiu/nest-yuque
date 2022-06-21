import {
    Controller,
    Headers,
    Query,
    Get,
    Body,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocService } from './doc.service';

@ApiTags('文档')
@Controller('doc')
export class DocController {
    constructor(private readonly docService: DocService) {}

    @ApiOperation({
        summary: '获取文档分页',
    })
    @Get()
    async getDocList(
        @Headers('token') token: string,
        @Query('page') page: string,
        @Query('size') size: string,
    ) {
        return await this.docService.getDocs(token, +page, +size);
    }

    @ApiOperation({
        summary: '提交文档',
    })
    @Post()
    async createDoc(
        @Headers('token') token: string,
        @Body() body: Record<string, any>,
    ) {
        return await this.docService.createDoc(token, body);
    }

    @ApiOperation({
        summary: '更新文档',
    })
    @Put()
    async updateDoc(
        @Headers('token') token: string,
        @Body() body: Record<string, any>,
    ) {
        return await this.docService.updateDoc(token, body);
    }
}
