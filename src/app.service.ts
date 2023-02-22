import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { WordPair, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getWords(): Promise<WordPair[]> {
    return await this.prisma.wordPair.findMany();
  }

  async createWord(data: Prisma.WordPairCreateInput): Promise<WordPair> {
    return this.prisma.wordPair.create({
      data,
    });
  }
}
