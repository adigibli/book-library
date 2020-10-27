import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BooksComponent, children: [
    {path: '', redirectTo: '/books', pathMatch: 'full'},
    //{path: 'new', component: BookEditComponent},
    {path: ':id', component: BookDetailsComponent},
    {path: ':id/edit', component: BookEditComponent},
  ]},
  {path: 'new', component: BookEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
