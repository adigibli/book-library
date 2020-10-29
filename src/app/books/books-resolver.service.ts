import { BookService } from './book.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../Shared/data-storage.model';
import { Book } from './Book.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService  implements Resolve<Book[]> {

  constructor(private dataStorageService: DataStorageService,
              private bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book[] | Observable<Book[]> | Promise<Book[]> {
        const books = this.bookService.getBooks();

        if ( books.length === 0) {
            return this.dataStorageService.get()
            .pipe(
            tap(data => {
               this.bookService.setBooks(data as Book[]);
            }));
        } else {
            return books;
        }
    }
}
