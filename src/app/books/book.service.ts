import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  addBook(newBook: Book): void{
    this.dataStorageService.add(newBook).subscribe(
      book => {
            this.books.push(book);
            this.multicastBookChanges();
            this.router.navigate(['books/' + book.id], {relativeTo: this.route});
        }
    );
  }

  editBook(id: number, updateBook: Book): void{
    this.dataStorageService.update(id, updateBook).subscribe(
      book => {
        var index =  this.books.findIndex(b => b.id  === id);
        this.books[index] = book;
        this.multicastBookChanges();
        this.router.navigate(['books/' + id], {relativeTo: this.route});
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
