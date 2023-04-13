import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
    constructor(private readonly producerService: ProducerService) {}

    async produceMessage(): Promise<void> {
        await this.producerService.produce({
            topic: 'hello',
            messages: [
                { value: 'Hello world!' }
            ]
        });
    }
}
