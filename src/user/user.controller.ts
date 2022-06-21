import { Controller, Param, Post } from '@nestjs/common';
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
    async setUser(@Param('token') token: string) {
        return await this.userService.setUser(token);
    }
}
