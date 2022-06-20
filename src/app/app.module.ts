import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRedisModule } from 'src/redis/redis.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [AppRedisModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
