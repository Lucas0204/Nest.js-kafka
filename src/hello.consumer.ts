import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class HelloConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume(
            { topics: [ 'hello' ] },
            {
                eachMessage: async ({ message, topic, partition }) => {
                    console.log({
                        value: message.value.toString(),
                        topic: topic.toString(),
                        partition: partition.toString()
                    });
                }
            }
        );
    }
}
