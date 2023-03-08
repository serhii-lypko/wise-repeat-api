import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { WordPair, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<WordPair[]> {
    return await this.prisma.wordPair.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByStatus(isLearned: boolean): Promise<WordPair[]> {
    return await this.prisma.wordPair.findMany({
      where: {
        isLearned,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: Prisma.WordPairCreateInput): Promise<WordPair> {
    return this.prisma.wordPair.create({
      data,
    });
  }

  async toggleStatus(id: string): Promise<WordPair> {
    const pairToUpdate = await this.prisma.wordPair.findUnique({
      where: {
        id,
      },
    });

    if (!pairToUpdate) {
      throw new NotFoundException();
    }

    return await this.prisma.wordPair.update({
      where: {
        id,
      },
      data: {
        isLearned: !pairToUpdate.isLearned,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.wordPair.delete({
      where: {
        id,
      },
    });
  }
}
