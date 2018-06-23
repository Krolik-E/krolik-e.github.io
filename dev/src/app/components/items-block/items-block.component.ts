import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-items-block',
  templateUrl: './items-block.component.html',
  styleUrls: ['./items-block.component.css']
})
export class ItemsBlockComponent implements OnInit {
  public itemsObservable: Observable<Item[]>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.itemsObservable = this.appService.getItems();
  }

  public deleteItem(index: number) {
    this.appService.deleteItem(index);
  }

  public makeItemActive(index: number) {
    this.appService.makeItemActive(index);
  }

}
