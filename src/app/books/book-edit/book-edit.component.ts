
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookMode } from './../Book.model';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  mode: BookMode;
  id: number;

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id =  +params['id'];
        this.mode = isNaN(this.id) ? BookMode.New: BookMode.Edit;
        this.initForm();
      }
    );
  }

  onSubmit(): void{
    if(this.mode === BookMode.Edit) {
      this.bookService.editBook(this.id, this.bookForm.value);
  } else {
      this.bookService.addBook(this.bookForm.value);
  }

  this.navigateBack();
  }

  onCancel(): void{
    this.navigateBack();
  }

  private navigateBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get registerFormControl(): {[key: string]: AbstractControl; }{
    return this.bookForm.controls;
  }

  get title(): AbstractControl{
    return this.bookForm.get('title');
  }

  get author(): AbstractControl{
    return this.bookForm.get('author');
  }

  private initForm(): void{
    let title = '';
    let author = '';
    let description = '';
    let imagePath = '';

    if (this.mode === BookMode.Edit){
      const book = this.bookService.getBook(this.id);

      title = book.title;
      author = book.author;
      description = book.description;
      imagePath = book.imagePath;
    }

    this.bookForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'author': new FormControl(author, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required)
    });
  }

}
