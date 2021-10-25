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
      roll: new FormControl(),
      section: new FormControl(),
      food: new FormControl()
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
}
