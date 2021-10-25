import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input() registrationCount: number;

  form: FormGroup;

  constructor (
    private _master: MasterService
  ) { this._createForm() }

  private _createForm() {
    this.form = new FormGroup({
      roll: new FormControl(),
      section: new FormControl(),
      food: new FormControl()
    });
  }

  getClass() {
    return this._master.getClassSection();
  }

  getFood() {
    return this._master.getFoodType();
  }

  getRollNumber() {
    let arr = [];
    for (let i = 0; i < this.registrationCount; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  add() {
    if (this.form.valid) {
      this._master.addDataToCollection(this.form.value);
    }
  }

}
