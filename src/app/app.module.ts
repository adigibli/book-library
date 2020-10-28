import { DataStorageService } from 'src/app/Shared/data-storage.model';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-list/book-item/book-item.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { HeaderComponent } from './header/header/header.component';
import { BookService } from './books/book.service';
import { BooksComponent } from './books/books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownDirective } from './Shared/dropdown.directive';
import { CanDeactivateGuardService } from './books/book-edit/can-deactivate-guard.service';

export function appInit(bookService: BookService) {
  return () => bookService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailsComponent,
    HeaderComponent,
    BooksComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService, CanDeactivateGuardService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [BookService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
