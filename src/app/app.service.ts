import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  private activeItemIndex: number | null;
  private itemsSubject: BehaviorSubject<Item[]>;
  private items: Item[];
  private commentsSubject: BehaviorSubject<string[]>;
  private key: string = 'KrolikE.github.io Task';
  private activeItemSubject: BehaviorSubject<number | null>;

  constructor(@Inject('LOCALSTORAGE') private localStorage: any) {
    this.checkLocalStorage();
    this.itemsSubject = new BehaviorSubject(this.items);
    this.activeItemIndex = this.items.findIndex((item, index) => {
      return item.active;
    });
    if (this.activeItemIndex === -1) {
      this.activeItemIndex = null;
    };
    this.activeItemSubject = new BehaviorSubject(this.activeItemIndex);
    console.log(this.activeItemIndex);
    this.commentsSubject = this.activeItemIndex !== null ? new BehaviorSubject(this.items[this.activeItemIndex].comments) : new BehaviorSubject([]);
  }

  public getItems() {
    return this.itemsSubject.asObservable();
  }

  public createItem(name: string) {
    this.items.push({ name, comments: [], active: false });
    this.itemsSubject.next(this.items);
    this.updateLocalStorage();
  }

  public deleteItem(index: number) {
    if (this.activeItemIndex === index) {
      this.activeItemIndex = null;
      this.activeItemSubject.next(this.activeItemIndex);
      this.commentsSubject.next([]);
    }
    this.items.splice(index, 1);
    this.itemsSubject.next(this.items);
    this.updateLocalStorage();
  }

  public makeItemActive(index: number) {
    if (this.activeItemIndex !== null) {
      this.items[this.activeItemIndex].active = false;
    }
    this.activeItemIndex = index;
    this.items[index].active = true;
    this.itemsSubject.next(this.items);
    this.activeItemSubject.next(this.activeItemIndex);
    this.commentsSubject.next(this.items[index].comments);
    this.updateLocalStorage();
  }

  public getActiveItem() {
    return this.activeItemSubject.asObservable();
  }

  public getComments() {
    return this.commentsSubject.asObservable();
  }

  public createComment(comment: string) {
    this.items[this.activeItemIndex].comments.push(comment);
    this.commentsSubject.next(this.items[this.activeItemIndex].comments);
    this.itemsSubject.next(this.items);
    this.updateLocalStorage();
  }

  private checkLocalStorage() {
    let items = [ 
      { name: 'First item with custom name',
        active: false,
        comments: []
      },
      { name: 'Second  item is active',
        active: true,
        comments: [
          'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s',
          'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s',
          'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s'
        ]
      }
      ];
    this.items = this.localStorage.getItem(this.key) ? JSON.parse(this.localStorage.getItem(this.key)) : items;
  }

  private updateLocalStorage() {
    this.localStorage.setItem(this.key, JSON.stringify(this.items));
  }

}
