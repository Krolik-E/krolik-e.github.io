import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  public newItemName = '';

  constructor(private appService: AppService) { }

  ngOnInit() {

  }

  public createNewItem() {
    console.log(this.newItemName);
    if (this.newItemName) {
      this.appService.createItem(this.newItemName);
      this.newItemName = '';
    }
  }

}
