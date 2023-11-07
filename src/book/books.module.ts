import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './books.model';
import { MulterModule } from '@nestjs/platform-express';
import { WinstonModule,  } from 'nest-winston';
import { AppLogger } from '../core/services/logger.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    WinstonModule
  ],
  controllers: [BooksController],
  providers: [BooksService, AppLogger],
})
export class BooksModule { }
