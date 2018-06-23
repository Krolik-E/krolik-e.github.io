import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ItemsBlockComponent } from './items-block/items-block.component';
import { CommentsBlockComponent } from './comments-block/comments-block.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SidebarComponent, CreateItemComponent, CreateCommentComponent, ItemsBlockComponent, CommentsBlockComponent],
  exports: [SidebarComponent, ItemsBlockComponent, CommentsBlockComponent]
})
export class ComponentsModule { }
