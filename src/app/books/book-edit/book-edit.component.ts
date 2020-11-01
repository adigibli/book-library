
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { BookMode } from './../Book.model';
import { CanComponentDeactivate } from './can-deactivate-guard.service';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, CanComponentDeactivate  {
  bookForm: FormGroup;
  mode: BookMode;
  id: number;
  changesSaved: boolean = false;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id =  +params['id'];
        this.mode = isNaN(this.id) ? BookMode.New : BookMode.Edit;
        this.initForm();
      }
    );
  }

  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean{
    if (this.mode === BookMode.Edit){
      if (this.bookForm.dirty && !this.changesSaved){
          return confirm('Do you want to discard the changes?');
      }
      return true;
    }
  }

  onSubmit(): void{
    if(this.mode === BookMode.Edit) {
        this.bookService.editBook(this.id, this.bookForm.value);
    } else {
        this.bookService.addBook(this.bookForm.value);
    }

    this.changesSaved = true;
    //this.navigateBack();
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

  get publicationDate(): AbstractControl{
    return this.bookForm.get('publicationDate');
  }

  get pages(): AbstractControl{
    return this.bookForm.get('pages');
  }

  get description(): AbstractControl{
    return this.bookForm.get('description');
  }

  get imagePath(): AbstractControl{
    return this.bookForm.get('imagePath');
  }

  private initForm(): void{
    let title = '';
    let author = '';
    let publicationDate = new Date();
    let pages = 1;
    let description = '';
    let imagePath = '';

    if (this.mode === BookMode.Edit){
      const book = this.bookService.getBook(this.id);

      title = book.title;
      author = book.author;
      publicationDate = book.publicationDate;
      pages = book.pages;
      description = book.description;
      imagePath = book.imagePath;
    }

    this.bookForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'author': new FormControl(author, Validators.required),
      'publicationDate': new FormControl(publicationDate, Validators.required),
      'pages': new FormControl(pages, [Validators.required, Validators.pattern('[1-9][0-9]*')]),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required)
    });
  }

}
