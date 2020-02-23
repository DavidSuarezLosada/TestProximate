import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public dataShare: Array<any>;

  setArray(array: any) {
    this.dataShare = array;
  }

  getArray() {
    return this.dataShare;
  }
  constructor() { }
}
