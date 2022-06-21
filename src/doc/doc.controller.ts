import { Controller, Headers, Query, Get, Body, Post } from '@nestjs/common';
import { DocService } from './doc.service';

@Controller('doc')
export class DocController {
    constructor(private readonly docService: DocService) {}

    @Get()
    async getDocList(
        @Headers('token') token: string,
        @Query('page') page: string,
        @Query('size') size: string,
    ) {
        return await this.docService.getDocs(token, +page, +size);
    }

    @Post()
    async createDoc(
        @Headers('token') token: string,
        @Body() body: Record<string, any>,
    ) {
        return await this.docService.createDoc(token, body);
    }
}
