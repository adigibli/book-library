import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private roter: Router) {
    this.books = this.bookService.getBooks();
   }

  ngOnInit(): void {
  }

  onNewBook(): void{
    this.roter.navigate(['new'], {relativeTo: this.route});
  }
}
