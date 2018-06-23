import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comments-block',
  templateUrl: './comments-block.component.html',
  styleUrls: ['./comments-block.component.css']
})
export class CommentsBlockComponent implements OnInit {
  public commentsObservable: Observable<string[]>;
  public activeItemIndexObserveble: Observable<number>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.commentsObservable = this.appService.getComments();
    this.activeItemIndexObserveble = this.appService.getActiveItem();
  }

}
