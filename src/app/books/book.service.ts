import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './Book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksChanged = new Subject<Book[]>();

  private bookLibraryUrl = 'https://itc-d-bl-svc.azurewebsites.net/api/books';
  private books: Book[] = [];
  //   new Book(1,
  //     'A Clash of Kings',
  //     'George R. R. Martin',
  //     'The scond book of the series Game of Thtones',
  //     'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562726234l/13496.jpg'),
  //     new Book(2,
  //       'A Storm of Swords ',
  //       'George R. R. Martin',
  //       'The first book of the series Game of Thtones',
  //       'https://awoiaf.westeros.org/images/9/93/AGameOfThrones.jpg')
  // ];

  constructor(private httpClient: HttpClient,) {
   }

  addBook(book: Book): void{
    this.books.push(book);
    this.multicastBookChanges();

    this.httpClient.post(this.bookLibraryUrl, book).subscribe(
        response => {
            console.log(response);
        }
    );
  }

  editBook(index: number, book: Book): void{
    this.books[index] = book;
    this.multicastBookChanges();

    this.httpClient.post(this.bookLibraryUrl, [index, book]).subscribe(
      response => {
          console.log(response);
      }
  );
  }

  deleteBook(index: number): void{
    this.books.splice(index, 1);
    this.multicastBookChanges();

    this.httpClient.delete(this.bookLibraryUrl + '/' + index).subscribe(
      response => {
          console.log(response);
      }
  );
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
