import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { WordPair } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  async ping() {
    return 'pong patched 0.1';
  }

  @Get()
  async getAll() {
    return await this.appService.getAll();
  }

  @Get('/to-learn')
  async getToLearn() {
    return await this.appService.getByStatus(/* isLearned: */ false);
  }

  @Get('/learned')
  async getLearned() {
    return await this.appService.getByStatus(/* isLearned: */ true);
  }

  @Post('/create')
  async create(@Body() data): Promise<WordPair> {
    return this.appService.create(data);
  }

  @Patch('/toggle-status/:id')
  async toggleStatus(@Param('id') id: string) {
    return await this.appService.toggleStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.appService.delete(id);
  }
}
