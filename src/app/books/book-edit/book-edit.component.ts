
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookMode } from './../Book.model';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  mode: BookMode = BookMode.New;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void{

  }

  get registerFormControl(): {[key: string]: AbstractControl; }{
    return this.bookForm.controls;
  }

  get title(): AbstractControl{
    return this.bookForm.get('title');
  }

  private initForm(): void{
    let title = '';
    let author = '';
    let description = '';
    let imagePath = '';

    if (this.mode === BookMode.New){
      this.bookForm = new FormGroup({
        'title': new FormControl(title, Validators.required),
        'imagePath': new FormControl(imagePath, Validators.required),
        'author': new FormControl(author, Validators.required),
        'description': new FormControl(description, Validators.required)
      });
    }
  }

}
