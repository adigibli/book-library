import { BooksResolverService } from './books/books-resolver.service';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CanDeactivateGuardService } from './books/book-edit/can-deactivate-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BooksComponent, children:
    [
      {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        resolve: [BooksResolverService]
      },
      {
        path: ':id/edit',
        component: BookEditComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: [BooksResolverService]
      }
    ]
  },
  {path: 'new', component: BookEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
