import { BookService } from './../book.service';
import { Book } from './../Book.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  id: number;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(
        (data: Data) => {
          //this.id = +params['id'];
          this.book = data['test'];
          //console.log('the book is: ' + this.book.author);
          //this.book = this.bookService.getBook(this.id);
        }
      );
  }

  onEdit(): void{
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(): void{
    this.bookService.deleteBook(this.id);
    this.router.navigate(['/books']);
  }

}
