export class Book{
   id: number;
   title: string;
   author: string;
   description: string;
   imagePath? :string;

   constructor(id: number,
              title: string,
              author: string,
              description: string,
              imagePath? :string){
      this.id = id;
      this.title = title;
      this.author = author;
      this.description = description;
      this.imagePath = imagePath;
    }
}
