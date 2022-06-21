import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRedisModule } from 'src/redis/redis.module';
import { UserModule } from 'src/user/user.module';
import { RepoModule } from 'src/repo/repo.module';
import { DocModule } from 'src/doc/doc.module';

@Module({
    imports: [AppRedisModule, UserModule, RepoModule, DocModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
