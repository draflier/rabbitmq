import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
    { 
      name: 'HELLO_SERVICE', transport: Transport.RMQ,
      options: {
        urls: ['amqp://myuser:mypassword@localhost:5672/hello'],
        queue: 'user-messages',
        queueOptions: {
          durable: false
              },
        },
     },
   ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
