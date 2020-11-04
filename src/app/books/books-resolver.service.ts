import { BookService } from './book.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../Shared/data-storage.model';
import { Book } from './Book.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService  implements Resolve<Book> {

  constructor(private router: Router,
              private bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book | Observable<Book> | Promise<Book> {

    const book = this.bookService.getBook(+route.params['id']);

    if(!book){
      this.router.navigate(['/books']);
    }

    return book;
    }
}
