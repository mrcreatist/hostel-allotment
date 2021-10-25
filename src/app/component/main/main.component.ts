import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  add() {
    console.log(this.form.controls.roll);
    if (this.form.valid && this.form.controls.roll.value > -1 && this.form.controls.roll.value <= this.getRegCount()) {
      this.addRegistration.emit(this.form.value);
    } else {
      if (this.form.controls.roll.value && (this.form.controls.roll.value < 0 || this.form.controls.roll.value > this.getRegCount())) {
        this.form.controls.roll.setErrors({ invalidMax: true })
      }
      this.form.markAllAsTouched();
    }
  }

  getValue(type, value) {
    switch (type) {
      case dropType.section: return section[value];
      case dropType.food: return food[value];
      default: return null;
    }
  }

  getRegCount() {
    return this._master.getTotalNumberOfStudents();
  }

}
