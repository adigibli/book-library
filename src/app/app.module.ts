import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-list/book-item/book-item.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { HeaderComponent } from './header/header/header.component';
import { BookService } from './books/book.service';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailsComponent,
    HeaderComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
