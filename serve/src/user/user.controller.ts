import { Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '绑定用户',
    })
    @Post(':token')
    async setUser(@Param('token') token: string, @Res({ passthrough: true }) response: Response) {
        const res = await this.userService.setUser(token);
        response.cookie('token', token, {
            httpOnly: true,
            maxAge: 2147483647,
        });
        return res;
    }
}
