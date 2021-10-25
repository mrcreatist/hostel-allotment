import { Component, OnInit } from '@angular/core';
import { result } from 'src/app/model';
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['section', 'veg', 'nonVeg'];
  dataSource: Array<result> = [];

  constructor (
    private _master: MasterService
  ) { }

  ngOnInit() {
    this._getData();
  }

  private _getData() {
    this._master.dataNotifier.subscribe(res => {
      this.dataSource = [];
      Object.keys(res).forEach(element => {
        this.dataSource.push({
          section: element,
          veg: res[element].veg,
          nonVeg: res[element].nonVeg
        })
      })
    });
  }

}
