import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './Book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksChanged = new Subject<Book[]>();

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

  addBook(book: Book): void{
    this.books.push(book);
    this.multicastBookChanges();
  }

  editBook(index: number, book: Book): void{
    this.books[index] = book;
    this.multicastBookChanges();
  }

  deleteBook(index: number): void{
    this.books.splice(index, 1);
    this.multicastBookChanges();
  }

  getBooks(): Book[]{
    return this.books.slice();
  }

  private multicastBookChanges(): void{
    this.booksChanged.next(this.books.slice());
  }

  getBook(id: number): Book{
    return this.books[id];
  }

  setBooks(books: Book[]): void{
    this.books = books;
    this.multicastBookChanges();
}
}
