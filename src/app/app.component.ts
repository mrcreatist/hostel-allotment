import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from './model';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  result: Array<result> = [];
  columns: string[] = ['section', 'veg', 'nonVeg'];

  constructor (
    private _master: MasterService
  ) { this._createForm() }

  ngOnInit() {
    this._getData();
  }

  private _createForm() {
    this.form = new FormGroup({
      registration: new FormControl(null, Validators.required),
      roll: new FormControl({ value: null, disabled: true }, Validators.required),
      section: new FormControl({ value: null, disabled: true }, Validators.required),
      food: new FormControl({ value: null, disabled: true }, Validators.required)
    });
  }

  private _getData() {
    this._master.dataNotifier.subscribe(res => {
      this.result = [];
      Object.keys(res).forEach(element => {
        this.result.push({
          section: element,
          veg: res[element].veg,
          nonVeg: res[element].nonVeg
        })
      })
    });
  }

  addStudent(data) {
    this._master.addDataToCollection(data);
  }

  onAllotmentAction(action) {
    switch (action) {
      case 'confirm': {
        if (this.form.controls.registration.valid) {
          this.setNumberOfStudents();
        }
        break;
      }
      case 'reset': {
        this.reset();
        break;
      }
    }
  }

  setNumberOfStudents() {
    this._master.setTotalNumberOfStudents(this.form.controls.registration.value);
    this.form.controls.registration.disable();
    this.form.controls.roll.enable();
    this.form.controls.section.enable();
    this.form.controls.food.enable();
  }

  reset() {
    this.form.reset();
    this.form.controls.registration.enable();
    this.form.controls.roll.disable();
    this.form.controls.section.disable();
    this.form.controls.food.disable();
    this._master.reset();
  }

  getHostelCount() {
    return this._master.getHostelCount();
  }

  getPerHostelValue() {
    return this._master.getStudentPerHostel();
  }
}
