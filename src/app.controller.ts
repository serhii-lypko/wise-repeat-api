import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { WordPair } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  async ping() {
    return 'pong';
  }

  @Get()
  async gerWords() {
    return await this.appService.getWords();
  }

  @Post()
  async createDraft(@Body() data): Promise<WordPair> {
    return this.appService.createWord(data);
  }
}
