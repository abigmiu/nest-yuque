import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppRedisService } from './redis.service';

const options = {
    port: 6379,
    host: 'localhost',
};

@Global()
@Module({
    imports: [
        RedisModule.forRoot({
            config: options,
        }),
    ],
    providers: [AppRedisService],
    exports: [AppRedisService],
})
export class AppRedisModule {}
