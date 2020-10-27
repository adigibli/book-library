import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
