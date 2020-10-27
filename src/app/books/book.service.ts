import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../Shared/data-storage.model';
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

  constructor(private dataStorageService: DataStorageService,) {
   }

  addBook(newBook: Book): void{
    this.dataStorageService.add(newBook).subscribe(
      book => {
            this.books.push(book);
            this.multicastBookChanges();
        }
    );
  }

  editBook(index: number, updateBook: Book): void{
    this.dataStorageService.update(index, updateBook).subscribe(
      book => {
        this.books[index] = book;
        this.multicastBookChanges();
      }
  );
  }

  deleteBook(id: number): void{
    this.dataStorageService.delete(id).subscribe(
      () => {
        this.books = this.books.filter(item => item.id !== id);
        this.multicastBookChanges();
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
    return this.books.find(book => book.id === id);
  }

  setBooks(books: Book[]): void{
    this.books = books;
    this.multicastBookChanges();
}

  load(): Promise<any>  {
    const promise = this.dataStorageService.get()
      .toPromise()
      .then(data => {
         this.setBooks(data as Book[]);
      });

    return promise;
  }
}
