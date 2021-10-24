import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor (
    private _master: MasterService
  ) { }

  getClass() {
    return this._master.getClassSection();
  }

  getFood() {
    return this._master.getFoodType();
  }

}
