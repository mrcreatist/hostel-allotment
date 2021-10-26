import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { dropType, food, section } from '../enum';
import { student } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private dataCollection: Array<student> = [];
  private result: any = {};
  private totalNumberOfStudents: number;
  private numberOfHostel = 4;
  private validRollLength = 4;
  dataNotifier = new BehaviorSubject(this.result);

  constructor (
    private _snackBar: MatSnackBar
  ) {
    this._resetResult();
    this.setDataNotifier();
  }

  // value fetchers

  getMasterData(type) {
    switch (type) {
      case dropType.section: return Object.keys(section);
      case dropType.food: return Object.keys(food);
      default: return null;
    }
  }

  getResult() {
    return this.result;
  }

  getKeys(data) {
    return Object.keys(data);
  }

  getStudentPerHostel(): number {
    return this.totalNumberOfStudents / this.numberOfHostel ? this.totalNumberOfStudents / this.numberOfHostel : 0;
  }

  getHostelCount(): number {
    return this.numberOfHostel ? this.numberOfHostel : 0;
  }

  getTotalNumberOfStudents() {
    return this.totalNumberOfStudents;
  }

  getValidRollLength() {
    return this.validRollLength;
  }

  setTotalNumberOfStudents(num: number) {
    this.totalNumberOfStudents = num;
    this.alert('init', num);
  }

  setDataNotifier() {
    this.dataNotifier.next(this.result);
  }


  // operators

  addDataToCollection(data: student) {
    if (this.dataCollection.indexOf(this.dataCollection.find(_ => _.roll === data.roll)) > -1) {
      // record already present!
      this._snackBar.open('Student already alloted!');
    } else if (!this.hasLimit()) {
      // max limit has reached!
      this._snackBar.open('Registration limit has reached!')
    } else {
      // ready to add
      this._sortData(data);
      this.dataCollection.push(data);
      this._snackBar.open('Student added!');
      let last = this.dataCollection[this.dataCollection.length - 1];
      this.alert('reg', last.roll, last.section, last.food === food.veg ? 'V' : 'NV');
    }
    setTimeout(() => this._snackBar.dismiss(), 3000);
  }

  reset() {
    this.alert('fin')
    let temp = this.result;
    this.getKeys(section).forEach(s => this.getKeys(food).forEach(f => temp[s][f].splice(0, 1)));
    this.alert(temp)
    this._resetResult();
    this.totalNumberOfStudents = 0;
    this.dataCollection = [];
    this.setDataNotifier();
  }

  alert(...text) {
    console.log(...text);
  }

  hasLimit(): boolean {
    return this.dataCollection.length < +this.totalNumberOfStudents
  }

  // private methods

  private _sortData(data: student) {
    let sec = this.getKeys(section).find(s => section[s] === data.section)
    let foo = this.getKeys(food).find(f => food[f] === data.food);
    let limit = Math.floor(this.getStudentPerHostel()) < 1 ? 1 : Math.floor(this.getStudentPerHostel());
    if ((this.result[sec][foo].length - 1) < limit && this.hasLimit()) {
      this.result[sec][foo].push(data.roll)
    } else {
      this.result.NA[foo].push(data.roll)
    }
    this.setDataNotifier();
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
      },
      NA: {
        veg: [],
        nonVeg: []
      }
    }
    this._addHostelNameToResult();
  }

  private _addHostelNameToResult() {
    let index = 0;
    this.getKeys(section).forEach(s => {
      this.getKeys(food).forEach(f => {
        this.result[s][f].push('<strong>Hostel ' + ++index + '</strong><br>')
      })
    });
  }

}
