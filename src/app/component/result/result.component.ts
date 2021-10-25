import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

export interface PeriodicElement {
  section: string;
  veg: number[];
  nonVeg: number[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { section: 'A', veg: [1, 2, 3], nonVeg: [4, 5, 6] },
];

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['section', 'veg', 'nonVeg'];
  dataSource = ELEMENT_DATA;

  constructor (
    private _master: MasterService
  ) { }

  ngOnInit() {
    this._getData();
  }

  private _getData() {
    this._master.dataNotifier.subscribe(res => console.log(res));
  }

}
