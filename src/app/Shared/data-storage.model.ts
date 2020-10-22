import { BookService } from './../books/book.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Book } from '../books/Book.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
    private bookLibraryUrl = 'https://booklibraryapi20201022094812.azurewebsites.net';

  constructor(private httpClient: HttpClient,
              private bookService: BookService) { }

  storeBook(): void
  {
    const books = this.bookService.getBooks();

    this.httpClient.put(this.bookLibraryUrl, books).subscribe(
        response => {
            console.log(response);
        }
    )
  }

  fetchBook(){
      return this.httpClient.get<Book[]>(this.bookLibraryUrl)
      .pipe(
          // map( books => {
          // return books.map( book => {
          //     return {...book, ingredients: recipe.ingredients ? recipe.ingredients : []};
          // });
          // }),
          tap(books => {
            this.bookService.setBooks(books);
          })
      );
  }
}
