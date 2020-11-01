export class Book{
   id: number;
   title: string;
   author: string;
   publicationDate: Date;
   pages: number;
   description: string;
   imagePath?: string;

   constructor(id: number,
               title: string,
               author: string,
               publicationDate: Date,
               pages: number,
               description: string,
               imagePath?: string){
      this.id = id;
      this.title = title;
      this.author = author;
      this.publicationDate = publicationDate;
      this.pages = pages;
      this.description = description;
      this.imagePath = imagePath;
    }
}

export enum BookMode {
  New = 'New',
  Edit = 'Edit'
}
