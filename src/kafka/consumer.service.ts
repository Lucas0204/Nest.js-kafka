import { ConfigService } from '@nestjs/config';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerSubscribeTopics, Kafka } from 'kafkajs';
import { ConsumerRunConfig } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka: Kafka;
    private readonly consumers: Consumer[];

    constructor(private readonly configService: ConfigService) {
        this.kafka = new Kafka({
            brokers: [ this.configService.get('KAFKA_BROKER') ]
        });

        this.consumers = [];
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }

    async consume({ topics, fromBeginning }: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({
            groupId: 'kafka-nestjs'
        });

        await consumer.connect();
        await consumer.subscribe({ topics, fromBeginning });
        await consumer.run(config);

        this.consumers.push(consumer);
    }
}
