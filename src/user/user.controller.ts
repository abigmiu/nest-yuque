import { Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post(':id')
    async setUser(@Param('id') id: string) {
        console.log(id);
        return await this.userService.setUser(id);
    }
}
