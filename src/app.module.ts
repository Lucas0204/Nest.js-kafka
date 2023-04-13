import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { HelloConsumer } from './hello.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KafkaModule
  ],
  controllers: [AppController],
  providers: [AppService, HelloConsumer],
})
export class AppModule {}
