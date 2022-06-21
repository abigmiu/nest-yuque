import {
    Controller,
    Get,
    Param,
    Post,
    Headers,
    Query,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post(':id')
    async setUser(@Param('id') id: string) {
        return await this.userService.setUser(id);
    }
}
