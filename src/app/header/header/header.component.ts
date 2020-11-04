import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/Shared/data-storage.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }


  ngOnInit(): void {
  }
}
