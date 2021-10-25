import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dropType, food, section } from 'src/app/enum';
import { student } from 'src/app/model';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input() form: FormGroup;
  @Output() addRegistration = new EventEmitter<student>();

  typeEnum = dropType;

  constructor (
    private _master: MasterService
  ) { }

  getMasterData(type: dropType) {
    return this._master.getMasterData(type);
  }

  getRollNumber() {
    let arr = [];
    for (let i = 0; i < this.form.controls.registration.value; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  add() {
    if (this.form.valid) {
      this.addRegistration.emit(this.form.value);
    }
  }

  getValue(type, value) {
    switch (type) {
      case dropType.section: return section[value];
      case dropType.food: return food[value];
      default: return null;
    }
  }

}
