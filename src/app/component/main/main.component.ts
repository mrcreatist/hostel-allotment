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
    if (this.form.valid && +this.form.controls.roll.value > -1 && +this.form.controls.roll.value.length === +this._master.getValidRollLength()) {
      this.addRegistration.emit(this.form.value);
    } else {
      if (this.form.controls.roll.value && (+this.form.controls.roll.value < -1 || +this.form.controls.roll.value.length !== +this._master.getValidRollLength())) {
        this.form.controls.roll.setErrors({ invalidLength: true })
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

}
