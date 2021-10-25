import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dropType, food, section } from 'src/app/enum';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input() registrationCount: number;

  form: FormGroup;
  typeEnum = dropType;

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

  getMasterData(type: dropType) {
    return this._master.getMasterData(type);
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

  getValue(type, value) {
    switch (type) {
      case 'section': return section[value];
      case 'food': return food[value];
      default: return null;
    }
  }

}
