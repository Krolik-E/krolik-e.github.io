import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  public comment: string = '';

  constructor(private appService: AppService) { }

  ngOnInit() {

  }

  onKeydown(event) {
    if (event.ctrlKey && event.key === 'Enter' && this.comment.length) {
      this.appService.createComment(this.comment);
      this.comment = '';
    }
  }

}
