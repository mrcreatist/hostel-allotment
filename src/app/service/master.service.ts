import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { food, section } from '../enum';
import { student } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private dataCollection = [];

  constructor (
    private _snackBar: MatSnackBar
  ) { }

  getMasterData(type) {
    switch (type) {
      case 'section': return Object.keys(section);
      case 'food': return Object.keys(food);
    }
    return null
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
    setTimeout(() => this._snackBar.dismiss(), 3000);
  }

}
