import { Injectable } from '@angular/core';
import { Book } from './Book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    new Book(1,
      'A Clash of Kings',
      'George R. R. Martin',
      'The scond book of the series Game of Thtones',
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562726234l/13496.jpg'),
      new Book(2,
        'A Storm of Swords ',
        'George R. R. Martin',
        'The first book of the series Game of Thtones',
        'https://awoiaf.westeros.org/images/9/93/AGameOfThrones.jpg')
  ];

  constructor() { }

  getBooks(): Book[]{
    return this.books.slice();
  }

  getBook(id: number): Book{
    return this.books[id];
  }
}
