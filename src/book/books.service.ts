import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from './dto/book.dto';
import { Book } from './books.model';
import { AppLogger } from '../core/services/logger.service';

@Injectable()
export class BooksService implements OnModuleInit {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>, private appLogger: AppLogger
  ) { }

  onModuleInit() {
    console.log(`The module has been initialized.`);
   
  }
  
  async addBook(bookDto: BookDto): Promise<Book> {
    const newBook = new this.bookModel(bookDto);
    await newBook.save();
    return newBook.toObject({ versionKey: false });
  }

  async getBooks(): Promise<Book[]> {
    this.appLogger.warn(' getBooks ')
    this.appLogger.error(' getBooks ', 'test')
    this.appLogger.log(' getBooks ')
    return await this.bookModel.find();
  }

  async getBookById(bookId: string): Promise<Book> {
    return await this.bookModel.findById({ _id: bookId });
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.bookModel.find({ title: { $regex: title, $options: 'i' } });
  }

  async updateBook(bookId: string, updatedBook: BookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(bookId, updatedBook, { new: true });
  }

  async deleteBook(prodId: string): Promise<void> {
    return await this.bookModel.deleteOne({ _id: prodId })
  }

  async deleteAllBooks(): Promise<void> {
    await this.bookModel.deleteMany({});
  }
}
