import { BookService } from './../books/book.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../books/Book.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
    private bookLibraryUrl = 'https://itc-d-bl-svc.azurewebsites.net/api/books';

  constructor(private httpClient: HttpClient,
              private bookService: BookService) { }

  storeBook(book: Book): void
  {
    this.httpClient.post(this.bookLibraryUrl, book).subscribe(
        response => {
            console.log(response);
        }
    );
  }

  fetchBooks(){
      return this.httpClient.get<Book[]>(this.bookLibraryUrl)
      .subscribe(books => {
        this.bookService.setBooks(books);
      });
  }

    getPosts(){
      return this.httpClient.get<Book[]>(this.bookLibraryUrl);
    }

  load(): Promise<any>  {
    const promise = this.httpClient.get(this.bookLibraryUrl)
      .toPromise()
      .then(data => {
        Object.assign(this, data);
        return data;
        // this.bookService.setBooks(data as Book[]);
      });

    return promise;
  }
}
