import { Controller, Post, Body, Get, Param, Put, Delete, UploadedFile, UseInterceptors, Inject, UseGuards, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book } from './books.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
@ApiTags('Book')
export class BooksController {
  constructor( private readonly booksService: BooksService) { }

  @ApiOperation({ summary: 'addBook' })
  @Post()
  async addBook(@Body() bookDto: BookDto, ): Promise<Book> {
    return await this.booksService.addBook(bookDto);
  }


  @ApiOperation({ summary: 'getBooks' })
  @Get()
  async getBooksByTitle(@Query('title') title: string): Promise<Book[]> {
    if (title) {
      // Eğer "title" sorgusu mevcutsa, bu sorgu ile veri çek
      return this.booksService.getBooksByTitle(title);
    } else {
      // "title" sorgusu eksikse, tüm kitapları getir
      return this.booksService.getBooks();
    }
  }

  @ApiOperation({ summary: 'getBookById' })
  @Get(':id')
  getBook(@Param('id') bookId: string) {
    return this.booksService.getBookById(bookId);
  }

  @ApiOperation({ summary: 'updateBook' })
  @Put(':id')
  async updateBook(@Param('id') bookId: string, @Body() updatedBook: BookDto): Promise<Book> {
    return this.booksService.updateBook(bookId, updatedBook);
  }

  @ApiOperation({ summary: 'removeBook' })
  @Delete(':id')
  async removeBook(@Param('id') bookId: string) {
    await this.booksService.deleteBook(bookId);
    return null;
  }

  @ApiOperation({ summary: 'removeAllBook' })
  @Delete('')
  async removeAll() {
    await this.booksService.deleteAllBooks();
    return null;
  }
}
