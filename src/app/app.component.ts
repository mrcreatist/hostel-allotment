import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;

  constructor () {
    this._createForm();
  }

  private _createForm() {
    this.form = new FormGroup({
      registration: new FormControl()
    });
  }
}
