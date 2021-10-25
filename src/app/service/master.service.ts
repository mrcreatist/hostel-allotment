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
    return Math.floor(this.totalNumberOfStudents / this.numberOfHostel) ? Math.floor(this.totalNumberOfStudents / this.numberOfHostel) : 0;
  }

  getHostelCount(): number {
    return this.numberOfHostel ? this.numberOfHostel : 0;
  }

  getTotalNumberOfStudents() {
    return this.totalNumberOfStudents;
  }

  setTotalNumberOfStudents(num: number) {
    this.totalNumberOfStudents = num;
  }

  setDataNotifier() {
    this.dataNotifier.next(this.result);
  }


  // operators

  addDataToCollection(data: student) {
    let student = this.dataCollection.find(_ => _.roll === data.roll);
    let studentIndex = this.dataCollection.indexOf(student);
    if (studentIndex > -1) {
      this.dataCollection.splice(studentIndex, 1);
    }
    this.dataCollection.push(data);
    this._snackBar.open('Student added!');
    this._sortData();
    setTimeout(() => this._snackBar.dismiss(), 3000);
  }

  reset() {
    this._resetResult();
    this.totalNumberOfStudents = 0;
    this.dataCollection = [];
    this.setDataNotifier();
  }

  // private methods

  private _sortData() {
    this._resetResult();
    this.getKeys(section).forEach(s => {
      let res = this.dataCollection.filter(_ => _.section === section[s]);
      if (res) {
        this.getKeys(food).forEach(f => {
          res.filter(_ => _.food === food[f]).map(_ => _.roll).forEach((element, index) => {
            if (index < this.getStudentPerHostel()) {
              this.result[s][f].push(element)
            } else {
              this.result.NA[f].push(element)
            }
          })
        })
      }
    });
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
  }

}
