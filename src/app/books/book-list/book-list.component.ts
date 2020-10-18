import { Component, OnInit } from '@angular/core';
import { Book } from '../Book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {
    this.books = this.getBooks();
   }

  ngOnInit(): void {
  }

  getBooks()
  {
    return this.bookService.getBooks();
  }

}
