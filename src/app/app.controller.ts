import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Hello World')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({
        summary: '点击这里获取一只小猫',
    })
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
