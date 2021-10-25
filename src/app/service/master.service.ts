import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { food, section } from '../enum';
import { student } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private dataCollection: Array<student> = [];
  private result: any = {};
  dataNotifier = new BehaviorSubject(this.result);

  constructor (
    private _snackBar: MatSnackBar
  ) {
    this._resetResult();
    this.setDataNotifier();
  }

  getMasterData(type) {
    switch (type) {
      case 'section': return Object.keys(section);
      case 'food': return Object.keys(food);
      default: return null;
    }
  }

  setDataNotifier() {
    this.dataNotifier.next(this.result);
  }

  addDataToCollection(data: student) {
    let student = this.dataCollection.find(_ => _.roll === data.roll);
    let studentIndex = this.dataCollection.indexOf(student);
    if (studentIndex > -1) {
      this.dataCollection[studentIndex] = data;
      this._snackBar.open('Student updated!');
    } else {
      this.dataCollection.push(data);
      this._snackBar.open('Student added!');
    }
    this.sortData();
    setTimeout(() => this._snackBar.dismiss(), 3000);
  }

  sortData() {
    this._resetResult();
    this.getKeys(section).forEach(s => {
      let res = this.dataCollection.filter(_ => _.section === section[s]);
      if (res) {
        this.getKeys(food).forEach(f => this.result[s][f] = res.filter(_ => _.food === food[f]).map(_ => _.roll))
      }
    });
    this.setDataNotifier();
  }

  getResult() {
    return this.result;
  }

  private _resetResult() {
    this.result = {
      A: {
        veg: [],
        nonVeg: []
      },
      B: {
        veg: [],
        nonVeg: []
      }
    }
  }

  getKeys(data) {
    return Object.keys(data);
  }

}
