import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { student } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private data = {
    classSection: ['A', 'B'],
    foodType: ['Veg', 'Non-Veg']
  }

  private dataCollection = [];

  constructor (
    private _snackBar: MatSnackBar
  ) { }

  getClassSection() {
    return this.data.classSection;
  }

  getFoodType() {
    return this.data.foodType;
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
