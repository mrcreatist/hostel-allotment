import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

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
