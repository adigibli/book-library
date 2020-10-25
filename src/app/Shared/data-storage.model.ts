import { BookService } from './../books/book.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Book } from '../books/Book.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
    private bookLibraryUrl = 'https://itc-d-bl-svc.azurewebsites.net/api/books';

  constructor(private httpClient: HttpClient,
              private bookService: BookService) { }

  storeBooks(): void
  {
    const books = this.bookService.getBooks();

    this.httpClient.post(this.bookLibraryUrl, books).subscribe(
        response => {
            console.log(response);
        }
    )
  }

  fetchBooks(){
      return this.httpClient.get<Book[]>(this.bookLibraryUrl)
      .subscribe(books => {
        this.bookService.setBooks(books);
      });
  }
}
