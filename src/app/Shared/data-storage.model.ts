import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../books/Book.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
    private bookLibraryUrl = 'https://itc-d-bl-svc.azurewebsites.net/api/books';

  constructor(private httpClient: HttpClient) { }

    get(): Observable<Book[]>{
      return this.httpClient.get<Book[]>(this.bookLibraryUrl);
    }

    add(book: Book): Observable<Book>{
      return this.httpClient.post<Book>(this.bookLibraryUrl, book);
    }

    update(id: number, book: Book): Observable<Book>{
      return this.httpClient.put<Book>(this.bookLibraryUrl + '/' + id, book);
    }

    delete(id): Observable<{}>{
      return this.httpClient.delete(this.bookLibraryUrl + '/' + id);
    }
}
