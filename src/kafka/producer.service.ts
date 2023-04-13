import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka: Kafka;
    private readonly producer: Producer;

    constructor(private readonly configService: ConfigService) {
        this.kafka = new Kafka({
            brokers: [ this.configService.get('KAFKA_BROKER') ]
        });

        this.producer = this.kafka.producer();
    }

    async onModuleInit() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }
}
