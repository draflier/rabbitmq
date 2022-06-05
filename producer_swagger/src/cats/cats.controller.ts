import { Body, Controller, Get, Param, Post,Inject, Logger } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService,@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    console.log("asdfdasf");  
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }

  @Post('/startproducer')
  async startproducer()  : Promise<string>
  {
    console.log("zxvzxcv");
    await this.client.emit<any>('message_printed', new Message('Hello World'));
    return "Hello World printed";
  }



  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
